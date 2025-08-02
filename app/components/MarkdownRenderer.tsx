import { ComponentPropsWithoutRef, memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ChevronDown, ChevronRight, Lightbulb } from "lucide-react";


// Markdown 代码组件类型
type CodeProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  className?: string;
};

// 可折叠列表组件
const CollapsibleOrderedList = ({ content }: { content: string }) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // 解析内容，将有序列表项和其下的内容分组
  const parseContent = (content: string) => {
    const lines = content.split("\n");
    const items: { title: string; content: string; index: number }[] = [];
    let currentItem: { title: string; content: string[]; index: number } | null = null;
    let itemIndex = 0;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // 匹配有序列表项 (1. 2. 3. 等)
      const orderedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);

      if (orderedMatch) {
        // 保存前一个项目
        if (currentItem) {
          items.push({
            title: currentItem.title,
            content: currentItem.content.join("\n"),
            index: currentItem.index,
          });
        }

        // 开始新的项目
        itemIndex++;
        currentItem = {
          title: orderedMatch[2],
          content: [],
          index: itemIndex,
        };
      } else if (currentItem && trimmedLine) {
        // 添加到当前项目的内容中
        currentItem.content.push(line);
      }
    }

    // 添加最后一个项目
    if (currentItem) {
      items.push({
        title: currentItem.title,
        content: currentItem.content.join("\n"),
        index: currentItem.index,
      });
    }

    return items;
  };

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const items = parseContent(content);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="border border-indigo-100 dark:border-indigo-800/40 rounded-lg overflow-hidden bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20"
        >
          <div
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-indigo-50/70 dark:hover:bg-indigo-900/30 transition-colors duration-200"
            onClick={() => toggleItem(item.index)}
          >
            <div className="flex items-start gap-3 flex-1">
              <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                {item.index}
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                {item.title}
              </span>
            </div>
            <div className="flex-shrink-0 ml-2">
              {expandedItems.has(item.index) ? (
                <ChevronDown className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
          </div>

          {expandedItems.has(item.index) && item.content.trim() && (
            <div className="px-3 pb-3 pl-12 border-t border-indigo-100/50 dark:border-indigo-800/30 bg-gradient-to-r from-indigo-25 to-purple-25 dark:from-indigo-950/30 dark:to-purple-950/30">
              <div className="pt-3">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: (props) => (
                      <p
                        className="leading-relaxed text-slate-700 dark:text-slate-300 text-sm mb-2"
                        {...props}
                      />
                    ),
                    ul: (props) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                    li: (props) => (
                      <li
                        className="leading-relaxed text-slate-700 dark:text-slate-300 text-sm"
                        {...props}
                      />
                    ),
                  }}
                >
                  {item.content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// 创建一个单独的MarkdownRenderer组件
const MarkdownRenderer = memo(({ content }: { content: string }) => {
  // 处理特殊的:::结论开始:::和:::结论结束:::包裹的内容，将其转换为自定义HTML
  const processedContent = content.replace(
    /:::结论开始:::([\s\S]*?):::结论结束:::/g,
    function (_, text) {
      return `<div class="highlight-card">${text}</div>`;
    }
  ).replace(
    /:::任务规划开始:::([\s\S]*?):::任务规划结束:::/g,
    function (_, text) {
      // 如果内容为空，则返回空字符串，不显示卡片
      return text.trim() ? `<div class="depth-thinking-card">${text}</div>` : '';
    }
  )

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        p: (props) => <p className="text-sm leading-relaxed font-playfair font-light text-white/80" {...props} />,
        h1: (props) => <h1 className="text-3xl font-playfair font-light mt-8 mb-4 tracking-wide text-white" {...props} />,
        h2: (props) => <h2 className="text-2xl font-playfair font-light mt-6 mb-3 tracking-wide text-white" {...props} />,
        h3: (props) => <h3 className="text-xl font-playfair font-light mt-4 mb-2 tracking-wide text-white" {...props} />,
        a: (props) => (
          <a className="text-white/60 hover:text-white underline hover:no-underline transition-colors duration-300" {...props} />
        ),
        code: ({ inline, children, ...props }: CodeProps) => {
          // 如果是行内代码，直接返回包裹的code元素
          if (inline) {
            return (
              <code
                className="bg-gray-100 dark:bg-gray-800 px-[0.4em] py-[0.2em] rounded-md text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          }

          // 对于代码块，使用 pre 标签
          return (
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg my-4 overflow-x-auto font-mono text-sm max-h-[250px]">
              <code className="block whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200" {...props}>
                {children}
              </code>
            </pre>
          );
        },
        // 我们完全移除pre的自定义处理
        ul: (props) => <ul className="list-disc pl-6 my-4 text-sm font-playfair font-light text-white/80" {...props} />,
        ol: (props) => <ol className="list-decimal pl-6 my-4 text-sm font-playfair font-light text-white/80" {...props} />,
        li: (props) => <li className="my-2 leading-relaxed font-playfair font-light text-white/80" {...props} />,
        blockquote: (props) => (
          <blockquote
            className="border-l-4 border-white/20 pl-4 italic my-4 leading-relaxed font-playfair font-light text-white/70"
            {...props}
          />
        ),
        table: (props) => (
          <div className="overflow-x-auto my-4 w-full">
            <table
              className="border-collapse border border-stone-300 dark:border-stone-700 w-full"
              {...props}
            />
          </div>
        ),
        th: (props) => (
          <th
            className="bg-stone-100 dark:bg-stone-800 text-left py-2 px-3 border border-stone-300 dark:border-stone-700"
            {...props}
          />
        ),
        td: (props) => (
          <td className="border border-stone-300 dark:border-stone-700 py-2 px-3" {...props} />
        ),
        img: ({ src, alt, ...props }) => {
          if (src === "") {
            return null;
          }
          return (
            <img 
              className="rounded-md mx-auto my-4 max-w-full dark:brightness-90" 
              alt={alt || ""} 
              {...props} 
            />
          );
        },
        hr: (props) => (
          <hr className="border-none border-t border-stone-300 dark:border-stone-700 my-8" {...props} />
        ),
        div: (props) => {
          if (props.className === "highlight-card") {
            // 检查内容是否包含有序列表模式
            const content =
              typeof props.children === "string"
                ? props.children
                : Array.isArray(props.children)
                  ? props.children.join("")
                  : "";

            const hasOrderedList = /^\s*\d+\.\s+/m.test(content);

            if (hasOrderedList) {
              return (
                <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-indigo-900/20 dark:via-blue-900/20 dark:to-purple-900/20 border border-indigo-200/60 dark:border-indigo-700/40 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 my-4 group">
                  {/* 内容区域 */}
                  <div className="relative px-5 py-4">
                    <CollapsibleOrderedList content={content} />
                  </div>

                  {/* 底部微妙的渐变线 */}
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent"></div>
                </div>
              );
            } else {
              return (
                <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-indigo-900/20 dark:via-blue-900/20 dark:to-purple-900/20 border border-indigo-200/60 dark:border-indigo-700/40 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 my-4 group">
                  {/* 内容区域 */}
                  <div className="relative px-5 py-4">
                    <div className="prose prose-sm max-w-none text-slate-800 dark:text-slate-200 leading-relaxed">
                      {props.children}
                    </div>
                  </div>

                  {/* 底部微妙的渐变线 */}
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent"></div>
                </div>
              );
            }
          }
          if (props.className === "depth-thinking-card") {
            return (
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900/20 dark:via-gray-900/20 dark:to-zinc-900/20 border border-slate-200/60 dark:border-slate-700/40 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 my-3 group p-3">
                <div className="absolute inset-0 bg-[url('/patterns/thinking-pattern.svg')] bg-[length:100px] opacity-10 dark:opacity-5"></div>
                <div className="relative space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="font-medium text-slate-600 dark:text-slate-400">任务规划</span>
                  </div>
                  <div className="prose prose-sm max-w-none text-slate-800 dark:text-slate-200 leading-relaxed">
                    {props.children}
                  </div>
                </div>
              </div>
            );
          }
          return <div {...props} />;
        },
      }}
    >
      {processedContent || ""}
    </ReactMarkdown>
  );
});

MarkdownRenderer.displayName = "MarkdownRenderer";

export default MarkdownRenderer;
