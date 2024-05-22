interface TagProps {
  text: string;
}

const Tag = ({ text }: TagProps) => {
  return (
    <span className="bg-blue-100 text-blue-500 text-md font-bold me-2 px-2.5 py-0.5 rounded">
      {text}
    </span>
  );
};

export default Tag;
