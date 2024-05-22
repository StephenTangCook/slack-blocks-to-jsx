import { Block } from "./types";
import { Header } from "./header";
import { getBlockComponent } from "./components";
import { BlockWrapper } from "./block_wrapper";
import { GlobalStore, useGlobalData } from "./store";
import { useEffect } from "react";

type Props = {
  /**
   * Not yet implemented.
   */
  theme?: "light" | "dark";
  /**
   * Show a link to open the message in the Slack Block Kit Builder, for debugging purposes. Defaults to false.
   */
  showBlockKitDebug?: boolean;
  blocks: Block[];
  logo: string;
  name: string;
  time?: Date;
  className?: string;
  style?: React.CSSProperties;
  unstyled?: boolean;
  data?: {
    users?: GlobalStore["users"];
    channels?: GlobalStore["channels"];
  };
  hooks?: GlobalStore["hooks"];
};

export const Message = (props: Props) => {
  const {
    blocks,
    logo,
    name,
    time = new Date(),
    className = "",
    style,
    showBlockKitDebug = false,
    unstyled = false,
    data = {},
    hooks = {},
  } = props;

  const { setChannels, setUsers, setHooks } = useGlobalData();

  useEffect(() => {
    if (data.users) setUsers(data.users);
    if (data.channels) setChannels(data.channels);
    if (hooks) setHooks(hooks);
  }, [data]);

  return (
    <div id="slack_blocks_to_jsx">
      <section
        className={`flex gap-2 w-full max-w-[600px] slack_blocks_to_jsx relative ${
          unstyled ? "styles_disabled" : "styles_enabled"
        } ${className}`}
        style={style}
      >
        {showBlockKitDebug && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://app.slack.com/block-kit-builder#${encodeURIComponent(
              JSON.stringify({ blocks }),
            )}`}
            className="text-xs absolute right-0 top-0 text-blue-500 underline"
          >
            Open in Slack Block Kit Builder
          </a>
        )}

        <div className="shrink-0">
          <img src={logo} className="w-9 h-9" alt={name} />
        </div>

        <div className="flex flex-col w-full">
          <Header name={name} time={time} />

          <div>
            {blocks.map((block, i) => {
              const element = getBlockComponent(block);
              if (!element) return null;

              return <BlockWrapper key={i}>{element}</BlockWrapper>;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
