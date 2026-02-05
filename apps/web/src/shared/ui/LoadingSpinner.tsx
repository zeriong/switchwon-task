import { Box } from "@repo/ui/Box";
import { Spinner } from "@repo/ui/assets/icons/Spinner";

interface LoadingSpinnerProps {
  /** Box로 감쌀지 여부 */
  withBox?: boolean;
  /** Box 사용 시 제목 */
  title?: string;
  /** Box 사용 시 추가 클래스 */
  className?: string;
}

export default function LoadingSpinner({
  withBox = false,
  title,
  className = "",
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex justify-center py-8">
      <Spinner color="#3479EB" />
    </div>
  );

  if (!withBox) {
    return spinner;
  }

  return (
    <Box as="section" className={className}>
      {title && (
        <h3 className="text-lg md:text-xl font-bold text-pr-gray-800 mb-4">
          {title}
        </h3>
      )}
      {spinner}
    </Box>
  );
}
