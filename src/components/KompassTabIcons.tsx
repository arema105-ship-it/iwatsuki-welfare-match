import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true as const,
  focusable: false as const,
};

/** 事業所 — コンパス針の屋根を持つ優しい施設 */
export function IconFacility(props: IconProps) {
  return (
    <svg {...baseProps} className="kompass-tab-icon" {...props}>
      <path d="M12 3 L17.4 9.2 H6.6 Z" />
      <path d="M5.6 9.2 H18.4 V18.4 C18.4 19.5 17.5 20.4 16.4 20.4 H7.6 C6.5 20.4 5.6 19.5 5.6 18.4 Z" />
      <path d="M10.5 20.4 V16.1 C10.5 15.3 11.2 14.6 12 14.6 C12.8 14.6 13.5 15.3 13.5 16.1 V20.4" />
      <path d="M7.8 12.4 H9.7" />
      <path d="M14.3 12.4 H16.2" />
    </svg>
  );
}

/** ストーリー — 開いた物語。ページの開きが針を連想 */
export function IconStory(props: IconProps) {
  return (
    <svg {...baseProps} className="kompass-tab-icon" {...props}>
      <path d="M12 4.2 L5.2 6.1 C4.5 6.3 4 7 4 7.7 V17.2 C4 18.1 4.8 18.7 5.6 18.5 L12 16.8" />
      <path d="M12 4.2 L18.8 6.1 C19.5 6.3 20 7 20 7.7 V17.2 C20 18.1 19.2 18.7 18.4 18.5 L12 16.8" />
      <path d="M12 4.2 V16.8" />
      <path d="M7.2 9.6 H10.2" />
      <path d="M13.8 9.6 H16.8" />
      <path d="M7.2 12.4 H9.4" />
      <path d="M14.6 12.4 H16.8" />
    </svg>
  );
}

/** お知らせ — 北を意識したシャープなベル */
export function IconNews(props: IconProps) {
  return (
    <svg {...baseProps} className="kompass-tab-icon" {...props}>
      <path d="M12 2.9 L13.55 5.7 C16.15 6.55 17.85 8.85 17.85 11.55 V14.7 C17.85 15.55 18.2 16.35 18.8 17 H5.2 C5.8 16.35 6.15 15.55 6.15 14.7 V11.55 C6.15 8.85 7.85 6.55 10.45 5.7 Z" />
      <path d="M10.15 17 C10.45 18.35 11.2 19.2 12 19.2 C12.8 19.2 13.55 18.35 13.85 17" />
    </svg>
  );
}

/** サポート — 針先のしっぽを持つ優しい吹き出し */
export function IconSupport(props: IconProps) {
  return (
    <svg {...baseProps} className="kompass-tab-icon" {...props}>
      <path d="M6.3 4.9 H17.7 C19 4.9 20.1 6 20.1 7.3 V13.1 C20.1 14.4 19 15.5 17.7 15.5 H13.85 L12 19.2 L10.15 15.5 H6.3 C5 15.5 3.9 14.4 3.9 13.1 V7.3 C3.9 6 5 4.9 6.3 4.9 Z" />
      <path d="M8.1 9.2 H15.9" />
      <path d="M8.1 11.8 H13.4" />
    </svg>
  );
}
