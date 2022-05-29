import React, { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // no custom props
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  return (
    <textarea
      {...props}
      className="border text-black rounded px-3 py-1 w-80"
    ></textarea>
  );
};

export default TextArea;
