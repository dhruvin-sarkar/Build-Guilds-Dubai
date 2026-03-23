import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

interface SignupModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const SignupModalContext = createContext<SignupModalContextValue | null>(null);

interface SignupModalProviderProps {
  children: ReactNode;
}

export function SignupModalProvider({ children }: SignupModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [close, isOpen, open],
  );

  return <SignupModalContext.Provider value={contextValue}>{children}</SignupModalContext.Provider>;
}

export function useSignupModal() {
  const contextValue = useContext(SignupModalContext);

  if (!contextValue) {
    throw new Error('useSignupModal must be used within a SignupModalProvider.');
  }

  return contextValue;
}
