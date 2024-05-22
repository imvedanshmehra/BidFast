interface TagProps {
  text: string;
  extra?: JSX.Element;
}

const Tag = ({ text, extra }: TagProps) => {
  return (
    <span className="bg-green-100 flex items-center gap-1 text-green-500 text-md font-bold me-2 px-2.5 py-0.5 rounded">
      {text} {extra}
    </span>
  );
};

export default Tag;
