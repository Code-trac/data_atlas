import { NextResponse } from 'next/server';
import { mockUser } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Simulate registration delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return new user
    const user = {
      ...mockUser,
      id: `user-${Date.now()}`,
      email,
      name,
      createdAt: new Date().toISOString(),
      savedDatasets: [],
    };
    const token = `mock-jwt-token-${Date.now()}`;

    return NextResponse.json({
      user,
      token,
    });
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
