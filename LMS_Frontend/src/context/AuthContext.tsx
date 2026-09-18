import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'student' | 'instructor' | 'admin';
export type UserStatus = 'active' | 'suspended';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  enrolledCourses?: number[];
  progress?: Record<number, number>;
}

export interface ManagedUser {
  id: number;
  name: string;
  email: string;
  role: Exclude<UserRole, 'admin'>;
  avatar: string;
  status: UserStatus;
  enrolledCourses?: number[];
  progress?: Record<number, number>;
  coursesTaught?: number;
}

export type NewManagedUserInput = {
  name: string;
  email: string;
  role: Exclude<UserRole, 'admin'>;
};

interface AuthContextValue {
  currentUser: AuthUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isLoggedIn: boolean;
  managedUsers: ManagedUser[];
  toggleUserStatus: (id: number) => void;
  removeUser: (id: number) => void;
  changeUserRole: (id: number, role: Exclude<UserRole, 'admin'>) => void;
  addUser: (user: NewManagedUserInput) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const MOCK_USERS: Record<UserRole, AuthUser> = {
  student: {
    id: 1,
    name: 'Anish Sah',
    email: 'anish34@gmail.com',
    role: 'student',
    avatar: '/images/users/anish.webp',
    enrolledCourses: [1, 2, 3],
    progress: { 1: 68, 2: 35, 3: 20 },
  },
  instructor: {
    id: 2,
    name: 'Ajay Shrestha',
    email: 'ajay12@gmail.com',
    role: 'instructor',
    avatar: '/images/instructors/ajay.jpeg',
  },
  admin: {
    id: 4,
    name: 'Admin User',
    email: 'admin@cloudcode.com.np',
    role: 'admin',
    avatar: '/images/admin/admin.jpg',
  },
};

const INITIAL_MANAGED_USERS: ManagedUser[] = [
  {
    id: 1,
    name: 'Anish Sah',
    email: 'anishsah12@gmail.com',
    role: 'student',
    avatar: '/images/users/anish.webp',
    status: 'active',
    enrolledCourses: [1, 2, 3],
    progress: { 1: 68, 2: 35, 3: 20 },
  },
  {
    id: 5,
    name: 'Anjila Basnet',
    email: 'anjila12@gmail.com',
    role: 'student',
    avatar: '/images/users/anjila.jpeg',
    status: 'active',
    enrolledCourses: [1, 4],
    progress: { 1: 90, 4: 12 },
  },
  {
    id: 6,
    name: 'Rohan Yadav',
    email: 'rohan12@gmail.com',
    role: 'student',
    avatar: '/images/users/rohan.jpeg',
    status: 'active',
    enrolledCourses: [2, 3, 5],
    progress: { 2: 40, 3: 15, 5: 0 },
  },
  {
    id: 7,
    name: 'Sangita Shrestha',
    email: 'sangita12@gmail.com',
    role: 'student',
    avatar: '/images/users/sangita.jpeg',
    status: 'suspended',
    enrolledCourses: [6],
    progress: { 6: 8 },
  },
  {
    id: 2,
    name: 'Ajay Shrestha',
    email: 'ajay12@gmail.com',
    role: 'instructor',
    avatar: '/images/instructors/ajay.jpeg',
    status: 'active',
    coursesTaught: 8,
  },
  {
    id: 3,
    name: 'Sobit Gaha Thapa Magar',
    email: 'sobit@gmail.com',
    role: 'instructor',
    avatar: '/images/instructors/sobit.jpeg',
    status: 'active',
    coursesTaught: 6,
  },
  {
    id: 8,
    name: 'Nirajan Chaudhary',
    email: 'nirajan123@gmail.com',
    role: 'instructor',
    avatar: '/images/instructors/nirajan.jpeg',
    status: 'active',
    coursesTaught: 10,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [managedUsers, setManagedUsers] = useState<ManagedUser[]>(INITIAL_MANAGED_USERS);

  const login = (role: UserRole) => {
    setCurrentUser(MOCK_USERS[role]);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleUserStatus = (id: number) => {
    setManagedUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
          : user
      )
    );
  };

  const removeUser = (id: number) => {
    setManagedUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const changeUserRole = (id: number, role: Exclude<UserRole, 'admin'>) => {
    setManagedUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              role,
              // Reset role-specific fields so the UI doesn't show stale data
              enrolledCourses: role === 'student' ? user.enrolledCourses ?? [] : undefined,
              progress: role === 'student' ? user.progress ?? {} : undefined,
              coursesTaught: role === 'instructor' ? user.coursesTaught ?? 0 : undefined,
            }
          : user
      )
    );
  };

  const addUser = (newUser: NewManagedUserInput) => {
    setManagedUsers((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1;
      const created: ManagedUser = {
        id: nextId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newUser.name || 'user')}`,
        status: 'active',
        ...(newUser.role === 'student'
          ? { enrolledCourses: [], progress: {} }
          : { coursesTaught: 0 }),
      };
      return [...prev, created];
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isLoggedIn: currentUser !== null,
        managedUsers,
        toggleUserStatus,
        removeUser,
        changeUserRole,
        addUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
