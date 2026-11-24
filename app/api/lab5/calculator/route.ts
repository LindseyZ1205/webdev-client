import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const rawA = searchParams.get("a");
  const rawB = searchParams.get("b");
  const a = Number(rawA);
  const b = Number(rawB);
  if (!rawA?.trim() || !rawB?.trim() || !Number.isFinite(a) || !Number.isFinite(b)) {
    return Response.json({ error: "Enter two valid, finite numbers." }, { status: 400 });
  }
  const operation = searchParams.get("operation");
  let result: number;
  switch (operation) {
    case "add": result = a + b; break;
    case "subtract": result = a - b; break;
    case "multiply": result = a * b; break;
    case "divide":
      if (b === 0) return Response.json({ error: "Cannot divide by zero." }, { status: 400 });
      result = a / b;
      break;
    default: return Response.json({ error: "Choose add, subtract, multiply, or divide." }, { status: 400 });
  }
  if (!Number.isFinite(result)) return Response.json({ error: "The result is outside the supported number range." }, { status: 400 });
  return Response.json({ a, b, operation, result });
}
