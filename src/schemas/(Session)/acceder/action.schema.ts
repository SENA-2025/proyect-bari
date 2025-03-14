"use server";

import { z } from "zod";

export const actionSchema = z.object({});

export type ActionType = z.infer<typeof actionSchema>;
