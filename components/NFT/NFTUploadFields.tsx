import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
// const ReactEditorJS = createReactEditorJS();
import dynamic from 'next/dynamic';

const EmojiSelector = dynamic(() => import('components/utility/EmojiPicker'), {
  ssr: false,
  loading: () => <p>...</p>,
});

export default function NFTUploadFields({
  setTokenInput,
  value,
  id,
  className,
}: {
  setTokenInput: any;
  value: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col space-y-4 w-full p-2">
      <PostEditor
        id={id}
        className={className}
        value={value}
        onChange={(descr) => {
          setTokenInput((x) => ({ ...x, descr }));
        }}
      />
    </div>
  );
}

export function PostEditor({
  onChange,
  value,
  id,
  className,
}: {
  onChange: (val: string) => any;
  value: string;
  id?: string;
  className?: string;
}) {
  // const [val, setVal] = useState(value);
  const textAreaRef = useRef(null);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  };

  useEffect(resizeTextArea, [value]);

  const _onChange = useCallback(
    (v: string) => {
      if (v?.length > 600) {
        return;
      }
      onChange(v);
    },
    [onChange]
  );

  const props = useMemo(() => (id ? { id } : {}), [id]);
  className = className || '';

  // console.log('textAreaRef.current', textAreaRef.current?.selectionStart);

  return (
    <div className="flex">
      <textarea
        {...props}
        className={
          'text-md bg-transparent focus:outline-none resize-none w-full ' +
          className
        }
        ref={textAreaRef}
        rows={1}
        placeholder="Post to your community..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <EmojiSelector
        onEmojiClick={(emo) =>
          _onChange(
            insertCharacterAtIndex(
              value,
              emo,
              textAreaRef.current?.selectionStart
            )
          )
        }
      />
    </div>
  );
}

function insertCharacterAtIndex(str: string, char: string, index: number) {
  return str.slice(0, index) + char + str.slice(index);
}
