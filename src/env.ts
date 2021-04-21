type EnvType = "production" | "development"
export const env: EnvType = process.env.ENV === "production" ? "production" : "development"