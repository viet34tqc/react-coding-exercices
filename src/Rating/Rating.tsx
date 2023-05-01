// How to display half star <https://ishadeed.com/article/star-rating-svg/>
// How to hover to update rating value: each star is an radio input. When we hover on an radio, it updates rating value
// First we will have svgs and inputs

type Props = {
  length: number;
  value: number;
  onChange: () => void;
  step: number;
};

const Rating = ({ length, step = 0.5 }: Props) => {
  return <div></div>;
};

export default Rating;
