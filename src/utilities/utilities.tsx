import React, { ReactNode } from "react";

interface LinkifyProps {
  children: ReactNode;
}

export const Linkify: React.FC<LinkifyProps> = ({ children }) => {
  const isUrl = (word: string) => {
    const urlPattern =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    return word.match(urlPattern);
  };

  const linkifyText = (text: string) => {
    const words = text.split(/\s+/);
    return words.map((word, index) => {
      return isUrl(word) ? (
        <a key={index} href={word} rel="noopener noreferrer" target="_blank">
          {word}
        </a>
      ) : (
        <React.Fragment key={index}>{word} </React.Fragment>
      );
    });
  };

  const linkifiedContent = linkifyText(children as string);

  return <span>{linkifiedContent}</span>;
};

export default Linkify;
