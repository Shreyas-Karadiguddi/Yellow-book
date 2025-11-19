import { Box, Skeleton } from '@mui/material'

export const SkeletonLoader = () => {
  return (
    <Box>
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton
          key={index}
          animation='wave'
          height={50}
          sx={{ fontSize: '1rem', mb: -1 }}
        />
      ))}
    </Box>
  )
}
