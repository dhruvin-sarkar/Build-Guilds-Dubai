import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { SIGNUP_URL } from '../data/constants';
import { useSignupModal } from '../context/SignupModal';
import styles from './SignupModal.module.css';

interface SignupFormState {
  preferredFirstName: string;
  legalFirstName: string;
  legalLastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  pronouns: string;
  howHeard: string;
  comingWithFriend: boolean;
  friendName: string;
}

type SignupField = keyof SignupFormState;
type SignupErrors = Partial<Record<SignupField, string>>;

const initialFormState: SignupFormState = {
  preferredFirstName: '',
  legalFirstName: '',
  legalLastName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  pronouns: '',
  howHeard: '',
  comingWithFriend: false,
  friendName: '',
};

function validateSignup(values: SignupFormState) {
  const errors: SignupErrors = {};

  if (!values.preferredFirstName.trim()) {
    errors.preferredFirstName = 'Add the name you want us to use on the day.';
  }

  if (!values.legalFirstName.trim()) {
    errors.legalFirstName = 'Legal first name is required.';
  }

  if (!values.legalLastName.trim()) {
    errors.legalLastName = 'Legal last name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.';
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required.';
  }

  if (!values.pronouns.trim()) {
    errors.pronouns = 'Choose or write your pronouns.';
  }

  if (!values.howHeard.trim()) {
    errors.howHeard = 'Tell us how you heard about Build Guild Dubai.';
  }

  return errors;
}

function SignupModal() {
  const { isOpen, close } = useSignupModal();
  const [formState, setFormState] = useState<SignupFormState>(initialFormState);
  const [errors, setErrors] = useState<SignupErrors>({});
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    previousActiveElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])',
        ),
      );

      if (!focusableElements.length) {
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (!event.shiftKey && activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }

      if (event.shiftKey && activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, isOpen]);

  if (!isOpen) {
    return null;
  }

  const updateField = <FieldName extends SignupField>(fieldName: FieldName, value: SignupFormState[FieldName]) => {
    setFormState((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [fieldName]: undefined,
      }));
    }
  };

  const handleTextChange = (fieldName: Exclude<SignupField, 'comingWithFriend'>) => {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      updateField(fieldName, event.target.value);
    };
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateSignup(formState);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    window.location.href = SIGNUP_URL;
  };

  return (
    <div className={styles.backdrop}>
      <button type="button" className={styles.overlay} aria-label="Close sign up form" onClick={close} />

      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-modal-title"
      >
        <div className={styles.header}>
          <div className={styles.headerCopy}>
            <p className={styles.eyebrow}>[ SYS://SIGNUP_INTAKE ]</p>
            <h2 id="signup-modal-title" className={styles.title}>
              Lock your spot, then we’ll hand off to Blueprint.
            </h2>
            <p className={styles.lead}>
              Give us the basics for the local attendee list. After this step, you’ll continue into the official
              Blueprint invite flow.
            </p>
          </div>

          <button type="button" className={styles.closeButton} onClick={close}>
            Close
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldGrid}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Preferred First Name</span>
              <input
                ref={firstInputRef}
                type="text"
                value={formState.preferredFirstName}
                onChange={handleTextChange('preferredFirstName')}
                className={styles.input}
                placeholder="What should we call you?"
              />
              {errors.preferredFirstName ? <span className={styles.error}>{errors.preferredFirstName}</span> : null}
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Pronouns</span>
              <input
                type="text"
                value={formState.pronouns}
                onChange={handleTextChange('pronouns')}
                className={styles.input}
                placeholder="he/him, she/her, they/them, or other"
              />
              {errors.pronouns ? <span className={styles.error}>{errors.pronouns}</span> : null}
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Legal First Name</span>
              <input
                type="text"
                value={formState.legalFirstName}
                onChange={handleTextChange('legalFirstName')}
                className={styles.input}
                placeholder="Legal first name"
              />
              {errors.legalFirstName ? <span className={styles.error}>{errors.legalFirstName}</span> : null}
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Legal Last Name</span>
              <input
                type="text"
                value={formState.legalLastName}
                onChange={handleTextChange('legalLastName')}
                className={styles.input}
                placeholder="Legal last name"
              />
              {errors.legalLastName ? <span className={styles.error}>{errors.legalLastName}</span> : null}
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Email</span>
              <input
                type="email"
                value={formState.email}
                onChange={handleTextChange('email')}
                className={styles.input}
                placeholder="you@example.com"
              />
              {errors.email ? <span className={styles.error}>{errors.email}</span> : null}
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Phone Number</span>
              <input
                type="tel"
                value={formState.phoneNumber}
                onChange={handleTextChange('phoneNumber')}
                className={styles.input}
                placeholder="+971"
              />
              {errors.phoneNumber ? <span className={styles.error}>{errors.phoneNumber}</span> : null}
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Date of Birth</span>
              <input
                type="date"
                value={formState.dateOfBirth}
                onChange={handleTextChange('dateOfBirth')}
                className={styles.input}
              />
              {errors.dateOfBirth ? <span className={styles.error}>{errors.dateOfBirth}</span> : null}
            </label>

            <label className={`${styles.field} ${styles.fieldWide}`}>
              <span className={styles.fieldLabel}>How did you hear about us?</span>
              <textarea
                value={formState.howHeard}
                onChange={handleTextChange('howHeard')}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Friend, Slack, school, poster, Instagram, etc."
              />
              {errors.howHeard ? <span className={styles.error}>{errors.howHeard}</span> : null}
            </label>

            <label className={`${styles.field} ${styles.fieldWide}`}>
              <span className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={formState.comingWithFriend}
                  onChange={(event) => updateField('comingWithFriend', event.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.fieldLabel}>I’m coming with a friend</span>
              </span>
            </label>

            {formState.comingWithFriend ? (
              <label className={`${styles.field} ${styles.fieldWide}`}>
                <span className={styles.fieldLabel}>Friend’s Name // Optional</span>
                <input
                  type="text"
                  value={formState.friendName}
                  onChange={handleTextChange('friendName')}
                  className={styles.input}
                  placeholder="Optional if you know it already"
                />
                {errors.friendName ? <span className={styles.error}>{errors.friendName}</span> : null}
              </label>
            ) : null}
          </div>

          <div className={styles.footer}>
            <p className={styles.privacyNote}>
              Your data is never shared with third parties. Local organizers have limited access to submitted
              information.
            </p>

            <div className={styles.actions}>
              <button type="button" className={styles.secondaryAction} onClick={close}>
                Cancel
              </button>
              <button type="submit" className={styles.primaryAction}>
                Continue to Blueprint
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupModal;
