import { Resend } from 'resend';

// Initialize only if API key exists to prevent build-time errors
const apiKey = process.env.RESEND_API_KEY;
export const resend = new Resend(apiKey || 're_placeholder_for_build');
