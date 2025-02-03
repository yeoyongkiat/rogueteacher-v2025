export const fadeInUp = {
  initial: {
    y: 40,
    opacity: 0
  },
  animate: (custom: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.2,
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1]
    }
  })
};

export const slideInFromLeft = {
  initial: {
    x: -40,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const slideInFromRight = {
  initial: {
    x: 40,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const scaleIn = {
  initial: {
    scale: 0.8,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "backOut"
    }
  }
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}; 