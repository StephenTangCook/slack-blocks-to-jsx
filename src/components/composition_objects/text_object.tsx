import { useGlobalData } from "../../store";
import type { TextObject as TextObjectType } from "../../types";
import { markdown_parser } from "../../utils";

type TextObjectProps = {
  data: TextObjectType;
  className?: string;
};

export const TextObject = (props: TextObjectProps) => {
  const { type, text, emoji, verbatim = false } = props.data;
  const { className = "" } = props;
  const { channels, users, hooks } = useGlobalData();

  // TODO: HANDLE VERBATIM

  const parsed = text.replace(/&gt;/g, "> ").replace(/&lt;/g, "<");

  if (type === "plain_text")
    return (
      <div className={className}>
        {markdown_parser(parsed, { markdown: false, users, channels, hooks })}
      </div>
    );

  return (
    <div className={className}>
      {markdown_parser(parsed, { markdown: true, users, channels, hooks })}
    </div>
  );
};
