import * as z from 'zod'

export const registrationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  experience: z.enum(['beginner', 'practicing', 'other']),
  agree: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions'
  })
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
