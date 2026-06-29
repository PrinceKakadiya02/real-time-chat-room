import { z } from "zod";
export const createRoomSchema = z.object({
    name: z
    .string()
    .min(3, "room name should have at least 3 characters")
    .max(30, "room name cannot exceed 30 characters "),

    password: z
    .string()
    .min(6, "password must be atleast 6 characters"),

    confirmPassword: z
    .string()
})
.refine((data) => 
    data.password === data.confirmPassword, {
        message: "password do not match",
        path: ["confirmPassword"]
});

export const joinRoomSchema = z.object({
    name: z
    .string()
    .min(3, "room name should have at least 3 characters")
    .max(30, "room name cannot exceed 30 characters "),
    
    password: z
    .string()
    .min(6, "password must be atleast 6 characters"),
})

export type createRoomInut = z.infer<typeof createRoomSchema>;
export type joinRoomInput = z.infer<typeof joinRoomSchema>;
