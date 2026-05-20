import DOMPurify from "isomorphic-dompurify";

let cogitSecurityPolicy: any;
let bypassPolicy: any;

if (typeof window !== "undefined" && window.trustedTypes) {
  // 1. 일반 HTML 검증용 정책 (cogit-policy)
  try {
    if (!window.trustedTypes.getAttributeType("cogit-policy", "HTML")) {
      cogitSecurityPolicy = window.trustedTypes.createPolicy("cogit-policy", {
        createHTML: (string: string) => DOMPurify.sanitize(string),
      });
    }
  } catch (e) {
    // 개발 모드 핫 리로딩 등으로 이미 존재할 경우 에러를 터뜨리지 않고 조용히 넘어갑니다.
  }

  // 2. 차트 CSS 스타일 우회용 정책 (bypass-policy)
  try {
    if (!window.trustedTypes.getAttributeType("bypass-policy", "HTML")) {
      bypassPolicy = window.trustedTypes.createPolicy("bypass-policy", {
        createHTML: (string: string) => string,
      });
    }
  } catch (e) {
    // 이미 존재할 경우 조용히 패스
  }
}

/**
 * 쌩 문자열을 받아서 브라우저가 신뢰하는 TrustedHTML 객체로 변환해주는 함수
 */
export const getTrustedHtml = (htmlString: string) => {
  if (cogitSecurityPolicy) {
    return cogitSecurityPolicy.createHTML(htmlString);
  }
  return DOMPurify.sanitize(htmlString);
};

/**
 * 개발자가 신뢰할 수 있는 내부 자원(스타일 등)에 대해 TrustedHTML 통행증을 발급하는 함수
 */
export const getBypassHtml = (htmlString: string) => {
  if (bypassPolicy) {
    return bypassPolicy.createHTML(htmlString);
  }
  return htmlString;
};
