import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { completed } = await request.json();
    const task = await prisma.task.update({
        where: { id: parseInt(params.id) },
        data: { completed },
    });
    return NextResponse.json(task);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.task.delete({
        where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: "Task deleted" });
}