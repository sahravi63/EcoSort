# app/utils/email.py

async def send_welcome_email(user):
    # Example: just log, replace with real email sending later
    print(f"Sending welcome email to {user.email}")

async def send_password_reset_email(user, token):
    # Example: just log, replace with real email sending later
    print(f"Sending password reset email to {user.email} with token: {token}")
