import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import UserModel from "@/app/lib/UserSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOption";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session=await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    mongoose.connect(process.env.dburi || 'mongodb+srv://sotcktutor:Rohitkumar@atlascluster.woz44kn.mongodb.net/leadsfor399').then((e) => {
      console.log(`database connected: ${e.connection.host}`);
    }).catch((error) => {
      console.log(error.message);
    });

    const userdetails = await UserModel.find();
    if (userdetails.length == 0) {
      return NextResponse.json({
        message: "DataBase is empty"
      })
    }
    return NextResponse.json({
      userdetails
    });
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({
      message: error.message
    });
  }
}
