import hexToColorClass from "../constants/colorMappings";
import slotColors from "../constants/soltNumMappings"

export default function Tower({ colorList }) {
  const baseOffset = 10; // 바닥 높이 보정

  // 최대 4개의 블록만 렌더링
  const limitedColors = colorList.slice(0, 4).map(
    (slotNum) => slotColors[slotNum] || "bg-gray-400" // 헥사코드가 없을 경우 기본 회색 적용
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-end relative">
      {/* 탑 블록 */}
      {limitedColors.map((colorClass, i) => (
        <div
          key={i}
          className={`absolute ${colorClass} rounded-sm z-10`}
          style={{
            height: `${20}%`, // 블록 높이
            width: `${95 - i * 22}%`, // 위로 갈수록 좁아지는 블록
            bottom: `${baseOffset + i * 20}%`, // 바닥 높이 보정
            left: `${(100 - (95 - i * 22)) / 2}%`, // 중앙 정렬
          }}
        ></div>
      ))}

      {/* 바닥 */}
      <div className="w-full h-0.5 bg-customTower absolute bottom-0 z-0"></div>

      {/* 기둥 */}
      <div className="w-0.5 h-full bg-customTower absolute bottom-0 z-0"></div>
    </div>
  );
}
