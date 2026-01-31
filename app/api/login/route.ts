import { NextResponse } from 'next/server';
import { mockUser } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Mock authentication - in production, validate against database
    // For demo purposes, accept any valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return mock user with provided email
    const user = { ...mockUser, email };
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
