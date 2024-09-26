import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Buachompoo Rerksuitthirat",
    studentId: "660610768",
  });
};
