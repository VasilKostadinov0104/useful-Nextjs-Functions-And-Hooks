export function advancedParseMarkdown({
  markdownText,
  font = `inter`,
  fontH3 = "",
  fontH2 = "",
  fontH1 = "",
  fontQuote = "",
  fontBold = "",
  fontSpan = "",
  fontI = "inter-i",
  fontLink = "",
  fontParagraph = "",
  fontList = "",
}) {
  const htmlText = markdownText
    //img
    .replace(
      /!\[(.*?)\]\((.*?)\)/gim,
      `<a class='inline-block' src='$2' target='_blank' ><img class='w-[100px] h-[100px] object-cover rounded-xl hover:scale-105 transform transition-all cursor-po ' alt='$1' src='$2' /></a>`
    )
    //link
    .replace(
      /\[(.*?)\]\((.*?)\)/gim,
      `<a target='_blank' class='text-[14px] leading-[19px] text-black opacity-60 ${
        !fontLink ? font : fontLink
      } ' href='$2'> $1 </a>`
    )
    //heading3
    .replace(
      /^### ?(.*$)/gim,
      `<h3 class='text-[14px]  leading-[19px] text-black opacity-60 ${
        !fontH3 ? font : fontH3
      }'>$1</h3>`
    )
    //heading 2
    .replace(
      /^## ?(.*$)/gim,
      `<h2 class='text-[16px]  leading-[19px] text-black opacity-60 ${
        !fontH2 ? font : fontH2
      }'>$1</h2>`
    )
    //heading 1
    .replace(
      /^# ?(.*$)/gim,
      `<h1 class='text-[18px]  leading-[19px] text-black opacity-60 ${
        !fontH1 ? font : fontH1
      }'>$1</h1>`
    )
    //quote
    .replace(
      /^\> ?(.*$)/gim,
      `<blockquote class='text-[14px]  leading-[19px] text-black italic opacity-60 ${
        !fontQuote ? font : fontQuote
      }'>$1</blockquote>`
    )
    //code
    .replace(
      /\`(.*?)\`/gim,
      `<span class='text-[14px]  leading-[19px] text-footer bg-primaryLightBlue rounded-xl px-2 my-2   ${
        !fontSpan ? font : fontSpan
      }'>$1</span>`
    )
    //list item
    .replace(
      /^[\-\+] ([^\+\*\-]+)$/gim,
      `<li class='${!fontList ? font : fontList}'>$1</li>`
    )
    //bold
    .replace(
      /\B\*{2}([^\n\*]+?)\*{2}\B/gim,
      `<b class=' text-[14px] font-bold -b leading-[19px] text-black opacity-60 ${
        !fontBold ? font : fontBold
      } '>$1</b>`
    )
    //span
    .replace(
      /\B\~{2}([^\n\*]+?)\~{2}\B/gim,
      `<span class=' text-[14px]  leading-[19px] text-red-600 opacity-60 line-through ${
        !fontSpan ? font : fontSpan
      } '>$1</span>`
    )
    //i
    .replace(
      /\B\*([^\n\*]+?)\*\B/gim,
      `<em class='text-[14px] italic -i leading-[19px] text-black opacity-60 ${
        !fontI ? font : fontI
      }'>$1</em>`
    )
    //underline
    .replace(/\<u\>(.*?)\<\/u\>/, `<u>$1</u>`)
    //break
    .replace(/\n$/gim, `<br />`)
    //paragraph
    .replace(
      /^([^\-\n\r\t\+\-\#\>][^\n\r\t]*)/gim,
      `<p class='${!fontParagraph ? font : fontParagraph}'>$1</p>`
    )
    .replace(
      /!\[(.*?)\]\((.*?)\)/gim,
      `<a class='inline-block' src='$2' target='_blank' ><img class='w-[100px] h-[100px] object-cover rounded-xl hover:scale-105 transform transition-all cursor-po ' alt='$1' src='$2' /></a>`
    )
    //link
    .replace(
      /\[(.*?)\]\((.*?)\)/gim,
      `<a target='_blank' class='text-[14px] leading-[19px] text-black opacity-60 ${
        !fontLink ? font : fontLink
      } ' href='$2'> $1 </a>`
    );
  return htmlText.trim();
}

export const parseMarkdownToPlainText = (markdownText) => {
  const htmlText = markdownText
    //heading3
    .replace(/^### ?(.*$)/gim, "$1")
    //heading 2
    .replace(/^## ?(.*$)/gim, "$1")
    //heading 1
    .replace(/^# ?(.*$)/gim, "$1")
    //quote
    .replace(/^\> ?(.*$)/gim, "$1")
    //code
    .replace(/\`(.*?)\`/gim, "$1")
    //bold
    .replace(/\B\*{2}([^\n\*]+?)\*{2}\B/gim, "$1")
    //span
    .replace(/\B\~{2}([^\n\*]+?)\~{2}\B/gim, "$1")
    //i
    .replace(/\B\*([^\n\*]+?)\*\B/gim, "$1")
    //img
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "$1")
    //link
    .replace(/\[(.*?)\]\((.*?)\)/gim, "$1")
    //underline
    .replace(/\<u\>(.*)\<\/u\>/, `$1`)
    //break
    .replace(/\n$/gim, ``)
    //paragraph
    .replace(/^([^$#@^~*`\n]*)/gim, "$1");
  return htmlText.trim();
};
