import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const serverEnv = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    ALCHEMY_KEY_BASE: z.string(),
    ALCHEMY_RPC_URL_BASE: z.string(),
    NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID_BASE: z.string(),
  },
  runtimeEnv: process.env,
  skipValidation: true,
});
