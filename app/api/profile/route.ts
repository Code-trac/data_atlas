import { NextResponse } from 'next/server';
import { mockUser } from '@/lib/mock-data';

// Store for session data (in production, use proper session management)
let currentUser = { ...mockUser };

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json(currentUser);
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Update user data
    currentUser = { ...currentUser, ...body };

    return NextResponse.json(currentUser);
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
