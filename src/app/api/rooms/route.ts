import { DB, readDB, writeDB,Database } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms: (<Database>DB).rooms,
    totalRooms: (<Database>DB).rooms.length,
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  if (payload === null)
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();
  const body = await request.json();
  const { roomName } = body;
  for (const room of (<Database>DB).rooms)
    if (room.roomName === roomName)
   return NextResponse.json(
     {
       ok: false,
       message: `Room ${"replace this with room name"} already exists`,
     },
    { status: 400 }
   );

  const roomId = nanoid();
  (<Database>DB).rooms.push({
    roomId: roomId,
    roomName: roomName,
  });
  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
