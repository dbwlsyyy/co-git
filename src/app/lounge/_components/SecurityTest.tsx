"use client";

export default function SecurityTest() {
  const handleAttack = () => {
    const targetDiv = document.getElementById("xss-target");
    if (targetDiv) {
      // 검증 안 된 문자열 넣기
      targetDiv.innerHTML =
        "<img src='x' onerror='alert(\"mXSS 공격 성공!\")' />";
    }
  };

  return (
    <div className="my-10 rounded-xl border-2 border-red-500 p-10">
      <h2 className="mb-4 text-xl font-bold">🛡️ Trusted Types 방어 테스트</h2>
      <div id="xss-target" className="mb-4 text-slate-500">
        여기에 공격이 들어갑니다...
      </div>

      <button
        onClick={handleAttack}
        className="rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        악성 스크립트 쏴보기
      </button>
    </div>
  );
}
