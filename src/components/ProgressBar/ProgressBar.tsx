import React from "react";

type ProgressBarProps = {
  progress: number; // значение прогресса от 0 до 100
  color?: string; // цвет шкалы прогресса (по умолчанию #4CAF50)
  backgroundColor?: string; // цвет фона шкалы прогресса (по умолчанию #E5E5EA)
  width?: number;
  height?: number; // высота шкалы прогресса (по умолчанию 20px)
  className?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = "#455AFF",
  backgroundColor = "#F2F2F2",
  width = 200,
  height = 13,
  className,
}) => {
  const progressBarStyle = {
    width: `${progress < 100 ? progress : 100}%`,
    height: `${height}px`,
    backgroundColor: color,
    borderRadius: "10px",
    transition: "width 0.7s ease-out",
  };

  const progressBarContainerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: backgroundColor,
    borderRadius: "10px",
    transition: "width 0.7s ease-out",
  };

  return (
    <div style={progressBarContainerStyle} className={className}>
      <div style={progressBarStyle} />
    </div>
  );
};
