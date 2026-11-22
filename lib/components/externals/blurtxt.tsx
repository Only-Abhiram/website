function BlurText({ text, className = "" }: { text: string; className?: string }) {
  return <span className={className}>{text}</span>;
}

export default BlurText;
