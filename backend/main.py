import os
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, field_validator
from dotenv import load_dotenv
from services.google_sheets import append_contact_to_sheet
from services.email_service import send_contact_email

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Agri Seeds API",
    description="Backend for Agriculture/Seed company website",
    version="1.0.0"
)

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactRequest(BaseModel):
    name: str
    phone: str
    email: EmailStr
    message: str

    @field_validator("name")
    @classmethod
    def name_must_not_be_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Name cannot be empty")
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters")
        return v

    @field_validator("phone")
    @classmethod
    def phone_must_be_valid(cls, v: str) -> str:
        v = v.strip()
        digits = "".join(c for c in v if c.isdigit())
        if len(digits) < 7 or len(digits) > 15:
            raise ValueError("Phone number must be between 7 and 15 digits")
        return v

    @field_validator("message")
    @classmethod
    def message_must_not_be_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Message cannot be empty")
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters")
        return v


@app.get("/")
async def root():
    return {"status": "ok", "message": "Agri Seeds API is running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.post("/contact")
async def contact(payload: ContactRequest):
    logger.info(f"New contact request from: {payload.email}")

    sheet_success = False
    email_success = False

    # 1. Save to Google Sheets
    try:
        append_contact_to_sheet(
            name=payload.name,
            phone=payload.phone,
            email=payload.email,
            message=payload.message,
        )
        sheet_success = True
        logger.info(f"Successfully saved contact to Google Sheets: {payload.email}")
    except Exception as e:
        logger.error(f"Google Sheets error: {e}", exc_info=True)

    # 2. Send email notification (non-blocking failure)
    try:
        send_contact_email(
            name=payload.name,
            phone=payload.phone,
            email=payload.email,
            message=payload.message,
        )
        email_success = True
        logger.info(f"Notification email sent for: {payload.email}")
    except Exception as e:
        logger.warning(f"Email notification failed (non-critical): {e}")

    if not sheet_success:
        raise HTTPException(
            status_code=503,
            detail="Could not save your message due to a server error. Please try again or contact us directly."
        )

    return {
        "success": True,
        "message": "Thank you! Your message has been received. We'll get back to you within 24 hours.",
        "email_sent": email_success,
    }
