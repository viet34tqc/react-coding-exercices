import {
  ClipboardEvent,
  Fragment,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from '../ui/Button';

type Props = {
  numInput?: number;
};

const OTPInut = ({ numInput = 4 }: Props) => {
  const [currentFocus, setCurrentFocus] = useState(0);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleFocus = (i: number) => {
    setCurrentFocus(i);
    inputRefs.current[i].select();
  };

  // Focus on the first input when component mounts
  useEffect(() => {
    if (!inputRefs.current.length) return;
    inputRefs.current[0].focus();
  }, []);

  const handleArrowInteraction = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowLeft') {
      focusInput(currentFocus - 1);
    } else if (e.key === 'ArrowRight') {
      focusInput(currentFocus + 1);
    } else if (e.key === 'Delete') {
      e.preventDefault();
      inputRefs.current[currentFocus].value = '';
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      inputRefs.current[currentFocus].value = '';
      focusInput(currentFocus - 1);
    }
  };

  const handleInputChange = (i: number) => {
    focusInput(i + 1);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    // We have to abstract the the currentFocus in case we are not pasting it from the first input.
    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, numInput - currentFocus);

    // Only allow string or number.
    if (!/^[\da-zA-Z]+$/.test(pastedData)) return;

    pastedData.split('').forEach((s, i) => {
      inputRefs.current[currentFocus + i].value = s;
    });
  };

  // This function handle focusing and selecting the active input.
  const focusInput = (index: number) => {
    // I'm limiting the currentFocus between 0 and numInput - 1
    const nextCurrentFocus = Math.max(Math.min(numInput - 1, index), 0);
    setCurrentFocus(nextCurrentFocus);
    inputRefs.current[nextCurrentFocus].focus();
    // TODO: Remove setTimeout
    // Using setTimeout as a workaround, otherwise input doesn't select the text
    setTimeout(() => {
      inputRefs.current[nextCurrentFocus].select();
    }, 0);
  };

  const handleClear = () => {
    inputRefs.current.forEach(input => (input.value = ''));
    focusInput(0);
  };

  return (
    <div className="flex flex-col items-center p-4 gap-8 bg-white rounded-md border border-gray-300 text-[#213547]">
      <h1 className="text-2xl">Enter Verification Code</h1>
      <div className="flex items-center gap-4">
        {Array(numInput)
          .fill(0)
          .map((_, i) => (
            <Fragment key={i}>
              <input
                ref={node => {
                  if (node) inputRefs.current[i] = node;
                }}
                onFocus={e => handleFocus(i)}
                onPaste={handlePaste}
                onInput={() => handleInputChange(i)}
                onKeyDown={handleArrowInteraction}
                autoComplete="off"
                maxLength={1}
                type="text"
                className="bg-white border text-3xl text-center border-gray-500 w-11 aspect-square"
              />
              {i !== numInput - 1 && <span>-</span>}
            </Fragment>
          ))}
      </div>
      <div className="flex gap-4">
        <Button onClick={handleClear}>Clear</Button>
        <Button
          onClick={() =>
            alert(inputRefs.current.reduce((a, b) => a + b.value, ''))
          }
        >
          Get OTP
        </Button>
      </div>
    </div>
  );
};

export default OTPInut;
