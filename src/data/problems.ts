export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url: string;
  videoUrl?: string;
}

export interface Category {
  id: number;
  name: string;
  problems: Problem[];
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'Arrays',
    problems: [
      { id: 1, title: 'Sort an array of 0s, 1s and 2s', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/sort-an-array-of-0s-1s-and-2s_892977', videoUrl: 'https://youtu.be/tp8IHIImoxU' },
      { id: 2, title: 'Middle of a Linked List', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/middle-of-linked-list_794', videoUrl: 'https://youtu.be/MOGBMuc51ZM' },
      { id: 3, title: 'Merge two sorted Linked Lists', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/merge-two-sorted-linked-lists_800332', videoUrl: 'https://youtu.be/jS0MPJZBnXA' },
      { id: 4, title: 'Remove duplicates from a sorted Linked List', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/unique-elements_2420727', videoUrl: 'https://youtu.be/tEJFQ9Y112M' },
      { id: 5, title: 'Remove N-th node from the end of a Linked List', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/981870', videoUrl: 'https://youtu.be/L6t2L33XbqY' },
      { id: 6, title: 'Add two numbers represented by Linked Lists', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/add-two-numbers-as-linked-lists_941298', videoUrl: 'https://youtu.be/8yOFPn6sEHQ' },
    ],
  },
  {
    id: 2,
    name: 'Arrays Part-II',
    problems: [
      { id: 7, title: 'Rotate a Linked List', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/799897', videoUrl: 'https://youtu.be/u97IRmkxQ0I' },
      { id: 8, title: 'Reverse a Linked List', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/799897', videoUrl: 'https://youtu.be/D2vI2DNJGd8' },
      { id: 9, title: 'Detect a Cycle in a Linked List', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/cycle-detection-in-a-singly-linked-list_628974', videoUrl: 'https://youtu.be/0Qk1Z1Cj60I' },
      { id: 10, title: 'Reverse a Linked List in groups of K', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/reverse-in-k-groups_766203', videoUrl: 'https://youtu.be/1Wdl4MUENn0' },
      { id: 11, title: 'Palindrome Linked List', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/799376', videoUrl: 'https://youtu.be/KqHQH0wL5MM' },
      { id: 12, title: 'Odd-Even Linked List', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1079389', videoUrl: 'https://youtu.be/qkKK_6vL3eY' },
    ],
  },
  {
    id: 3,
    name: 'Arrays Part-III',
    problems: [
      { id: 13, title: 'Intersection of Two Linked Lists', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/630457', videoUrl: 'https://youtu.be/0c9p9cK97Lw' },
      { id: 14, title: 'Reverse Pairs', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/reverse-pairs_1112652', videoUrl: 'https://youtu.be/0DyC0hL8yYY' },
      { id: 15, title: 'Merge two Sorted Arrays without extra space', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/ninja-and-sorted-arrays_1214628', videoUrl: 'https://youtu.be/Nd4rTfH12mA' },
      { id: 16, title: 'Find the Duplicate in an Array of N+1 Integers', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1112602', videoUrl: 'https://youtu.be/32Ll3fTpBxM' },
      { id: 17, title: 'Maximum Subarray Sum', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/983605', videoUrl: 'https://youtu.be/w_KEocd__20' },
      { id: 18, title: 'Print the matrix in spiral manner', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/896775', videoUrl: 'https://youtu.be/1ZgBupA7_dQ' },
    ],
  },
  {
    id: 4,
    name: 'Arrays Part-IV',
    problems: [
      { id: 19, title: 'Two Sum', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/two-sum_891375', videoUrl: 'https://youtu.be/FFD7M3bIvxs' },
      { id: 20, title: 'Sort an array of 0s, 1s and 2s', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/sort-an-array-of-0s-1s-and-2s_892977', videoUrl: 'https://youtu.be/tp8IHIImoxU' },
      { id: 21, title: '4Sum', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/4sum_5731497', videoUrl: 'https://youtu.be/eD95JH8RFPQ' },
      { id: 22, title: 'Longest Consecutive Sequence', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/longest-consecutive-sequence_8230707', videoUrl: 'https://youtu.be/o7eJDrU0PVY' },
      { id: 23, title: 'Largest Subarray with K Sum', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/longest-subarray-with-sum-k_892994', videoUrl: 'https://youtu.be/xfZhb9qK154' },
      { id: 24, title: 'Trapping Rain Water', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/630519', videoUrl: 'https://youtu.be/f1bGUlBmMh4' },
    ],
  },
  {
    id: 5,
    name: 'Linked List',
    problems: [
      { id: 25, title: 'Reverse a Linked List', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/799897', videoUrl: 'https://youtu.be/D2vI2DNJGd8' },
      { id: 26, title: 'Find the middle of a Linked List', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/middle-of-linked-list_794', videoUrl: 'https://youtu.be/MOGBMuc51ZM' },
      { id: 27, title: 'Merge two Sorted Linked Lists', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/merge-two-sorted-linked-lists_800332', videoUrl: 'https://youtu.be/jS0MPJZBnXA' },
      { id: 28, title: 'Remove N-th node from end of Linked List', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/981870', videoUrl: 'https://youtu.be/L6t2L33XbqY' },
      { id: 29, title: 'Add two numbers as Linked Lists', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/add-two-numbers-as-linked-lists_941298', videoUrl: 'https://youtu.be/8yOFPn6sEHQ' },
      { id: 30, title: 'Delete a given Node when a node is given', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/628284', videoUrl: 'https://youtu.be/M0B5jy2B424' },
    ],
  },
  {
    id: 6,
    name: 'Linked List Part-II',
    problems: [
      { id: 31, title: 'Starting point of a Loop in a Linked List', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1112628', videoUrl: 'https://youtu.be/17Y2gKNVv9A' },
      { id: 32, title: 'Reverse a Linked List in groups of K', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/reverse-in-k-groups_766203', videoUrl: 'https://youtu.be/1Wdl4MUEnn0' },
      { id: 33, title: 'Check if a Linked List is a Palindrome', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/799376', videoUrl: 'https://youtu.be/KqHQH0wL5MM' },
      { id: 34, title: 'Flatten a Linked List', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/1112655', videoUrl: 'https://youtu.be/vmLrGk8BPhA' },
      { id: 35, title: 'Rotate a Linked List', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/799897', videoUrl: 'https://youtu.be/u97IRmkxQ0I' },
      { id: 36, title: 'Clone a Linked List with random and next pointer', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/clone-a-linked-list-with-random-and-next-pointer_842575', videoUrl: 'https://youtu.be/4QwA4EMH8gU' },
    ],
  },
  {
    id: 7,
    name: 'Linked List and Arrays',
    problems: [
      { id: 37, title: '3Sum', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1112628', videoUrl: 'https://youtu.be/eVEHJ8a0VzQ' },
      { id: 38, title: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/1102307', videoUrl: 'https://youtu.be/ysfL08YcEVA' },
      { id: 39, title: 'Max Consecutive Ones', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/max-consecutive-ones_3210032', videoUrl: 'https://youtu.be/Mo33MoH95bg' },
      { id: 40, title: 'Longest Subarray with Sum K', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/longest-subarray-with-sum-k_892994', videoUrl: 'https://youtu.be/xfZhb9qK154' },
      { id: 41, title: 'Trapping Rain Water', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/630519', videoUrl: 'https://youtu.be/f1bGUlBmMh4' },
      { id: 42, title: 'Container with Most Water', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/890226', videoUrl: 'https://youtu.be/9H2Vx1JbR8E' },
    ],
  },
  {
    id: 8,
    name: 'Greedy Algorithm',
    problems: [
      { id: 43, title: 'N Meetings in One Room', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/1062712', videoUrl: 'https://youtu.be/3VILHXJ00qo' },
      { id: 44, title: 'N-Job Scheduling', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/1062712', videoUrl: 'https://youtu.be/3VILHXJ00qo' },
      { id: 45, title: 'Minimum Platforms', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/minimum-platforms_2044306', videoUrl: 'https://youtu.be/0vq7f10b6mY' },
      { id: 46, title: 'Job Sequencing Problem', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1062712', videoUrl: 'https://youtu.be/3VILHXJ00qo' },
      { id: 47, title: 'Fractional Knapsack', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/fractional-knapsack-1587115620', videoUrl: 'https://youtu.be/F-IIkWS5NTI' },
      { id: 48, title: 'Assign Cookies', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/890226', videoUrl: 'https://youtu.be/9H2Vx1JbR8E' },
    ],
  },
  {
    id: 9,
    name: 'Recursion',
    problems: [
      { id: 49, title: 'Subset Sum', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/subsum_8230851', videoUrl: 'https://youtu.be/eQCR7UNWqFY' },
      { id: 50, title: 'Combination Sum', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/combination-sum_7705475', videoUrl: 'https://youtu.be/OyZ5h6fBh_M' },
      { id: 51, title: 'Next Permutation', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/next-permutaion_8230742', videoUrl: 'https://youtu.be/FhVZDFBsCIQ' },
      { id: 52, title: 'Subset Sum II', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/subset-sum-ii_8230396', videoUrl: 'https://youtu.be/K01urGFY2vU' },
      { id: 53, title: 'Permutation Sequence', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/983629', videoUrl: 'https://youtu.be/wT7gcunY5m4' },
      { id: 54, title: 'Combination Sum II', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/combination-sum-ii_7705493', videoUrl: 'https://youtu.be/G31790w_GBU' },
    ],
  },
  {
    id: 10,
    name: 'Recursion and Backtracking',
    problems: [
      { id: 55, title: 'Sudoku Solver', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/sudoku-solver_8230704', videoUrl: 'https://youtu.be/2rN8xYA-E9c' },
      { id: 56, title: 'N Queens', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/n-queens_8230707', videoUrl: 'https://youtu.be/n6QAn-D8AXQ' },
      { id: 57, title: 'M-Coloring Problem', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/m-coloring-problem_981273', videoUrl: 'https://youtu.be/wM682xLhwbY' },
      { id: 58, title: 'Rat in a Maze', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/rat-in-a-maze_1235207', videoUrl: 'https://youtu.be/bLGHpKtLlYU' },
      { id: 59, title: 'Word Break', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/word-break-1093691', videoUrl: 'https://youtu.be/TKj0kMn00tU' },
      { id: 60, title: 'Palindrome Partitioning', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230752', videoUrl: 'https://youtu.be/qmPm0tMR78E' },
    ],
  },
  {
    id: 11,
    name: 'Binary Search',
    problems: [
      { id: 61, title: 'Nth Root of a Number', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/nth-root-of-m_1062679', videoUrl: 'https://youtu.be/fSdJ8Kp9qJg' },
      { id: 62, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/search-in-rotated-sorted-array_7046498', videoUrl: 'https://youtu.be/630POV7zVhM' },
      { id: 63, title: 'Search in Rotated Sorted Array II', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/search-in-rotated-sorted-array-ii_7449507', videoUrl: 'https://youtu.be/630POV7zVhM' },
      { id: 64, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/minimum-element-in-rotated-sorted-array_7469003', videoUrl: 'https://youtu.be/ctKm9182c0Y' },
      { id: 65, title: 'Koko Eating Bananas', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/koko-eating-bananas_7429355', videoUrl: 'https://youtu.be/qIxxb0W_5cE' },
      { id: 66, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/893049', videoUrl: 'https://youtu.be/D1KfH1L09jE' },
      { id: 67, title: 'Allocate Minimum Number of Pages', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/allocate-books_1090540', videoUrl: 'https://youtu.be/MWfN-x91m0c' },
      { id: 68, title: 'Aggressive Cows', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/1082549', videoUrl: 'https://youtu.be/hMAlGNwjCOk' },
    ],
  },
  {
    id: 12,
    name: 'Heaps',
    problems: [
      { id: 69, title: 'K most frequent elements', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/top-k-frequent-elements_1267115', videoUrl: 'https://youtu.be/e-8xdc6eW6Q' },
      { id: 70, title: 'Median in a stream of integers', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/median-in-a-stream_8230714', videoUrl: 'https://youtu.be/dzS63fE18bc' },
      { id: 71, title: 'Top K Frequent Words', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1267115', videoUrl: 'https://youtu.be/e-8xdc6eW6Q' },
      { id: 72, title: 'Kth largest element in a stream', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/kth-largest-element-in-a-stream_8230743', videoUrl: 'https://youtu.be/YkIjP_fLmNk' },
      { id: 73, title: 'Find Median from Data Stream', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/median-in-a-stream_8230714', videoUrl: 'https://youtu.be/dzS63fE18bc' },
      { id: 74, title: 'Merge K Sorted Lists', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/merge-k-sorted-lists_1380998', videoUrl: 'https://youtu.be/1k3y71Q9W5Y' },
    ],
  },
  {
    id: 13,
    name: 'Stack and Queue',
    problems: [
      { id: 75, title: 'Balanced Parentheses', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/975477', videoUrl: 'https://youtu.be/7uZkJPn1pVw' },
      { id: 76, title: 'Next Smaller Element', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1112587', videoUrl: 'https://youtu.be/v8L11C1x31g' },
      { id: 77, title: 'LRU Cache', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/lru-cache_3410266', videoUrl: 'https://youtu.be/xDE2bJ6C4D0' },
      { id: 78, title: 'Implement Stack using Queue', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/873366', videoUrl: 'https://youtu.be/8r3q9I5wTJ0' },
      { id: 79, title: 'Implement Queue using Stack', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/873377', videoUrl: 'https://youtu.be/3WIKVnLsWdE' },
      { id: 80, title: 'Next Greater Element', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/next-greater-element_1112585', videoUrl: 'https://youtu.be/8L0xSf8bFWM' },
      { id: 81, title: 'Implement Min Stack', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/min-stack_3839089', videoUrl: 'https://youtu.be/Z34J14fC9bA' },
    ],
  },
  {
    id: 14,
    name: 'Stack and Queue Part-II',
    problems: [
      { id: 82, title: 'Stock Span Problem', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/stock-span_1387866', videoUrl: 'https://youtu.be/p9T-f8YfQ2k' },
      { id: 83, title: 'Largest Rectangle in Histogram', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/890226', videoUrl: 'https://youtu.be/0BdLVyhu240' },
      { id: 84, title: 'Max area in histogram', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/largest-rectangle-in-histogram_890226', videoUrl: 'https://youtu.be/0BdLVyhu240' },
      { id: 85, title: 'Sliding Window Maximum', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/1112587', videoUrl: 'https://youtu.be/C4o8mMCma1E' },
      { id: 86, title: 'Celebrate Problem', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1112585', videoUrl: 'https://youtu.be/8L0xSf8bFWM' },
      { id: 87, title: 'Rotting Oranges', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/rotting-oranges_8230713', videoUrl: 'https://youtu.be/y704fEOx-08' },
      { id: 88, title: 'Asteroid Collision', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1112587', videoUrl: 'https://youtu.be/v8L11C1x31g' },
      { id: 89, title: 'Sum of Subarray Minimums', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1112585', videoUrl: 'https://youtu.be/8L0xSf8bFWM' },
      { id: 90, title: 'Online Stock Span', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/stock-span_1387866', videoUrl: 'https://youtu.be/p9T-f8YfQ2k' },
      { id: 91, title: 'Remove K Digits', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1112587', videoUrl: 'https://youtu.be/v8L11C1x31g' },
    ],
  },
  {
    id: 15,
    name: 'String',
    problems: [
      { id: 92, title: 'Reverse Words in a String', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/reverse-words-in-a-string_702654', videoUrl: 'https://youtu.be/rBhAq1nU6dU' },
      { id: 93, title: 'Longest Palindromic Substring', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/646615', videoUrl: 'https://youtu.be/u5L9bKp3BkY' },
      { id: 94, title: 'Roman Number to Integer and Vice Versa', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1112209', videoUrl: 'https://youtu.be/Cv5W3s6MO30' },
      { id: 95, title: 'String to Integer (atoi)', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/892113', videoUrl: 'https://youtu.be/pEhtLp8Y5nA' },
      { id: 96, title: 'Longest Common Prefix', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/longest-common-prefix_823874', videoUrl: 'https://youtu.be/udKE2hT8T7Y' },
      { id: 97, title: 'Rabin-Karp Algorithm', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/8230763', videoUrl: 'https://youtu.be/oxCkEEtMxHQ' },
    ],
  },
  {
    id: 16,
    name: 'String Part-II',
    problems: [
      { id: 98, title: 'Anagram of a String', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/anagram-pairs_625811', videoUrl: 'https://youtu.be/U7h2fXVv0Do' },
      { id: 99, title: 'Count and Say', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/893362', videoUrl: 'https://youtu.be/GdtZ8IjNDOM' },
      { id: 100, title: 'Check if one string is a rotation of the other', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/8230796', videoUrl: 'https://youtu.be/vXGK1QHMOxI' },
      { id: 101, title: 'Z-Function Algorithm', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/8230762', videoUrl: 'https://youtu.be/g6BWu4d7y3Y' },
      { id: 102, title: 'KMP Algorithm / LPS Array', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/8230762', videoUrl: 'https://youtu.be/GWUq7XBf0SA' },
      { id: 103, title: 'Min Characters for Palindrome', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230754', videoUrl: 'https://youtu.be/EJ46b-bYvMM' },
    ],
  },
  {
    id: 17,
    name: 'Binary Tree',
    problems: [
      { id: 104, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/maximum-depth-of-binary-tree_8230805', videoUrl: 'https://youtu.be/eKt4kQ1fCXA' },
      { id: 105, title: 'Balanced Binary Tree', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/975477', videoUrl: 'https://youtu.be/7uZkJPn1pVw' },
      { id: 106, title: 'Diameter of Binary Tree', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/5866701', videoUrl: 'https://youtu.be/ImnGN2RE5OA' },
      { id: 107, title: 'Mirror Tree', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/938373', videoUrl: 'https://youtu.be/xwS7T0rPbYg' },
      { id: 108, title: 'Inorder Traversal', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/938881', videoUrl: 'https://youtu.be/6Yjv15dDXjI' },
      { id: 109, title: 'Preorder Traversal', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/938882', videoUrl: 'https://youtu.be/3xILaK3Yy1I' },
      { id: 110, title: 'Postorder Traversal', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/938883', videoUrl: 'https://youtu.be/1h87Bv2f0MQ' },
      { id: 111, title: 'Top View of Binary Tree', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/938889', videoUrl: 'https://youtu.be/3lMIJweI1IM' },
      { id: 112, title: 'Bottom View of Binary Tree', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/938890', videoUrl: 'https://youtu.be/0FtA_Y8J8Z8' },
      { id: 113, title: 'Left View of Binary Tree', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/938886', videoUrl: 'https://youtu.be/KM0127bGZnI' },
      { id: 114, title: 'Right View of Binary Tree', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/938887', videoUrl: 'https://youtu.be/9u8R1b8t1mA' },
      { id: 115, title: 'Vertical Order Traversal', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/938891', videoUrl: 'https://youtu.be/9TlWnCjv3a0' },
    ],
  },
  {
    id: 18,
    name: 'Binary Tree Part-II',
    problems: [
      { id: 116, title: 'Level Order Traversal', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/level-order-traversal_5955084', videoUrl: 'https://youtu.be/xhI3YX1o9bE' },
      { id: 117, title: 'Zigzag Level Order Traversal', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1062538', videoUrl: 'https://youtu.be/3nUQ33M9m8k' },
      { id: 118, title: 'Height of a Binary Tree', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/8230805', videoUrl: 'https://youtu.be/eKt4kQ1fCXA' },
      { id: 119, title: 'Root to Node Path', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230853', videoUrl: 'https://youtu.be/fmfl5n1te70' },
      { id: 120, title: 'Max Path Sum', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/7949944', videoUrl: 'https://youtu.be/9d97UqgSzjY' },
      { id: 121, title: 'Lowest Common Ancestor', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1092632', videoUrl: 'https://youtu.be/13m9Z8L1LhY' },
      { id: 122, title: 'Same Tree', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/8230720', videoUrl: 'https://youtu.be/N27H15n3vB8' },
      { id: 123, title: 'Symmetric Tree', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/1093386', videoUrl: 'https://youtu.be/I20f5PdJ710' },
    ],
  },
  {
    id: 19,
    name: 'Binary Tree Part-III',
    problems: [
      { id: 124, title: 'Binary Tree from Inorder and Preorder', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/893114', videoUrl: 'https://youtu.be/Ltr8DVkHm3Y' },
      { id: 125, title: 'Construct Binary Tree from Inorder and Postorder', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/893114', videoUrl: 'https://youtu.be/Ltr8DVkHm3Y' },
      { id: 126, title: 'Flatten Binary Tree to Linked List', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1093313', videoUrl: 'https://youtu.be/sWf7kOx7Nx0' },
      { id: 127, title: 'Maximum width of Binary Tree', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/938957', videoUrl: 'https://youtu.be/cdwjkrQK5dE' },
      { id: 128, title: 'Children Sum Property', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/938922', videoUrl: 'https://youtu.be/uLGKq01p-2I' },
      { id: 129, title: 'Check for Children Sum Property', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/938922', videoUrl: 'https://youtu.be/uLGKq01p-2I' },
      { id: 130, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/7949944', videoUrl: 'https://youtu.be/9d97UqgSzjY' },
    ],
  },
  {
    id: 20,
    name: 'Binary Search Tree',
    problems: [
      { id: 131, title: 'Search in a Binary Search Tree', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/8230754', videoUrl: 'https://youtu.be/Ks1LhM4rfb4' },
      { id: 132, title: 'Floor and Ceil in a BST', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230760', videoUrl: 'https://youtu.be/Ks1LhM4rfb4' },
      { id: 133, title: 'Kth Smallest and Largest Element', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1093618', videoUrl: 'https://youtu.be/Xqz4wMo9MGE' },
      { id: 134, title: 'Validate BST', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1092209', videoUrl: 'https://youtu.be/sSbLI98sBKU' },
      { id: 135, title: 'LCA in a BST', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1092215', videoUrl: 'https://youtu.be/7xdkHc5c62E' },
      { id: 136, title: 'Construct a BST from a Preorder Traversal', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230775', videoUrl: 'https://youtu.be/9swWu41kTQg' },
      { id: 137, title: 'Inorder Successor of BST', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230771', videoUrl: 'https://youtu.be/6DgRXv9d-E0' },
    ],
  },
  {
    id: 21,
    name: 'Binary Search Tree Part-II',
    problems: [
      { id: 138, title: 'Delete a Node from BST', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230759', videoUrl: 'https://youtu.be/5E9u7dUQf5I0' },
      { id: 139, title: 'Kth Largest Element in BST', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230826', videoUrl: 'https://youtu.be/Xqz4wMo9MGE' },
      { id: 140, title: 'Two Sum in BST', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230835', videoUrl: 'https://youtu.be/bRq2zL0Rz2M' },
      { id: 141, title: 'BST Iterator', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230767', videoUrl: 'https://youtu.be/D2jMhx0dE3Q' },
      { id: 142, title: 'Size of BST', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/8230765', videoUrl: 'https://youtu.be/cYUfOMr3f3E' },
      { id: 143, title: 'Merge Two BSTs', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/8230773', videoUrl: 'https://youtu.be/91w07WaxUlg' },
      { id: 144, title: 'Recover BST / Correct BST with two swaps', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/8230780', videoUrl: 'https://youtu.be/BWk2d1l1h8M' },
      { id: 145, title: 'Inorder Predecessor and Successor', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230771', videoUrl: 'https://youtu.be/6DgRXv9d-E0' },
    ],
  },
  {
    id: 22,
    name: 'Binary Trees [Miscellaneous]',
    problems: [
      { id: 146, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/8230757', videoUrl: 'https://youtu.be/91w07WaxUlg' },
      { id: 147, title: 'Binary Tree to BST', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230793', videoUrl: 'https://youtu.be/Q8p2WY1wN0M' },
      { id: 148, title: 'Burn a Binary Tree from a leaf node', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/8230790', videoUrl: 'https://youtu.be/r_54Km9A0mA' },
      { id: 149, title: 'Count of Nodes in a Binary Tree', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/8230802', videoUrl: 'https://youtu.be/e0G42VrU5kE' },
      { id: 150, title: 'Vertical Width of a Binary Tree', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/938891', videoUrl: 'https://youtu.be/9TlWnCjv3a0' },
      { id: 151, title: 'Check if Binary Tree is a BST', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1092209', videoUrl: 'https://youtu.be/sSbLI98sBKU' },
    ],
  },
  {
    id: 23,
    name: 'Graph',
    problems: [
      { id: 152, title: 'BFS of Graph', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230729', videoUrl: 'https://youtu.be/8hU6eWj9xMs' },
      { id: 153, title: 'DFS of Graph', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230730', videoUrl: 'https://youtu.be/6tqJXfzE0Ys' },
      { id: 154, title: 'Number of Islands', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230719', videoUrl: 'https://youtu.be/mwJ1gX5C7bM' },
      { id: 155, title: 'Flood Fill Algorithm', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230708', videoUrl: 'https://youtu.be/C1W1qM2t2hU' },
      { id: 156, title: 'Connected Components in an Undirected Graph', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230850', videoUrl: 'https://youtu.be/b25F2qfVjQY' },
      { id: 157, title: 'Cycle Detection in an Undirected Graph', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1062670', videoUrl: 'https://youtu.be/6st0J0WcK3k' },
      { id: 158, title: 'Distance of Nearest Cell Having 1', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230867', videoUrl: 'https://youtu.be/TmhJMhN5RfY' },
      { id: 159, title: 'Detect Cycle in a Directed Graph', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1062670', videoUrl: 'https://youtu.be/6st0J0WcK3k' },
      { id: 160, title: 'Bipartite Graph', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230764', videoUrl: 'https://youtu.be/_X5hM4p5mD0' },
      { id: 161, title: 'Course Schedule I', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230783', videoUrl: 'https://youtu.be/73srlBZ35VE' },
      { id: 162, title: 'Course Schedule II', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230784', videoUrl: 'https://youtu.be/73srlBZ35VE' },
      { id: 163, title: 'Topological Sort', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230791', videoUrl: 'https://youtu.be/73srlBZ35VE' },
    ],
  },
  {
    id: 24,
    name: 'Graph Part-II',
    problems: [
      { id: 164, title: 'Dijkstra\'s Algorithm', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230831', videoUrl: 'https://youtu.be/PmG59Kx8YtE' },
      { id: 165, title: 'Shortest Path in Directed Acyclic Graph', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230833', videoUrl: 'https://youtu.be/C4gxo3pND5I' },
      { id: 166, title: 'Shortest Path in Undirected Graph with Unit Weights', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230833', videoUrl: 'https://youtu.be/C4gxo3pND5I' },
      { id: 167, title: 'Bellman-Ford Algorithm', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/8230847', videoUrl: 'https://youtu.be/Hl-3t6VVR2U' },
      { id: 168, title: 'Floyd-Warshall Algorithm', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/8230836', videoUrl: 'https://youtu.be/Hl-3t6VVR2U' },
      { id: 169, title: 'Minimum Spanning Tree (Prim\'s)', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/8230837', videoUrl: 'https://youtu.be/1wMHqMmJ0tY' },
    ],
  },
  {
    id: 25,
    name: 'Dynamic Programming',
    problems: [
      { id: 170, title: 'Climbing Stairs', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/758958', videoUrl: 'https://youtu.be/wlft2q7KFB4' },
      { id: 171, title: 'House Robber', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1264918', videoUrl: 'https://youtu.be/3WaxQMELSkw' },
      { id: 172, title: '0/1 Knapsack', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1072981', videoUrl: 'https://youtu.be/GqOQ7zL67e8' },
      { id: 173, title: 'Subset Sum Equal to K', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230769', videoUrl: 'https://youtu.be/sS11Q6hT4tE' },
      { id: 174, title: 'Coin Change', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230705', videoUrl: 'https://youtu.be/kM2cw15dQ3w' },
      { id: 175, title: 'Longest Increasing Subsequence', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/630459', videoUrl: 'https://youtu.be/BHn3M5WJmfs' },
      { id: 176, title: 'Edit Distance', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230731', videoUrl: 'https://youtu.be/73r3KWiEvyk' },
    ],
  },
  {
    id: 26,
    name: 'Dynamic Programming Part-II',
    problems: [
      { id: 177, title: 'Longest Common Subsequence', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230706', videoUrl: 'https://youtu.be/73r3KWiEvyk' },
      { id: 178, title: 'Grid Unique Paths', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1215090', videoUrl: 'https://youtu.be/nrgdyP0XVbs' },
      { id: 179, title: 'Triangle', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1215133', videoUrl: 'https://youtu.be/SrP-PiBVqaY' },
      { id: 180, title: 'Minimum Path Sum', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1215090', videoUrl: 'https://youtu.be/nrgdyP0XVbs' },
      { id: 181, title: 'Maximum Product Subarray', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230732', videoUrl: 'https://youtu.be/Y2uBGVnqA6E' },
      { id: 182, title: 'Word Break', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/1093691', videoUrl: 'https://youtu.be/TKj0kMn00tU' },
      { id: 183, title: 'Minimum Jump', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230709', videoUrl: 'https://youtu.be/BhdHd22pFM4' },
      { id: 184, title: 'Longest Palindromic Subsequence', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230736', videoUrl: 'https://youtu.be/73r3KWiEvyk' },
    ],
  },
  {
    id: 27,
    name: 'Trie',
    problems: [
      { id: 185, title: 'Implement Trie', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230718', videoUrl: 'https://youtu.be/pX4vXG7WGg4' },
      { id: 186, title: 'Implement Trie – Part 2', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230721', videoUrl: 'https://youtu.be/Ghrb1hJn2hY' },
      { id: 187, title: 'Longest Common Prefix', difficulty: 'Easy', url: 'https://www.codingninjas.com/codestudio/problems/823874', videoUrl: 'https://youtu.be/udKE2hT8T7Y' },
      { id: 188, title: 'Count Distinct Substrings', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230770', videoUrl: 'https://youtu.be/6kTfYh3Wf0U' },
      { id: 189, title: 'Implement a Phone Directory', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/8230781', videoUrl: 'https://youtu.be/UKhG9LQFbqg' },
      { id: 190, title: 'Maximum XOR with an Element from Array', difficulty: 'Hard', url: 'https://www.codingninjas.com/codestudio/problems/8230758', videoUrl: 'https://youtu.be/kR8N07B9k8I' },
      { id: 191, title: 'Maximum XOR of Two Numbers in an Array', difficulty: 'Medium', url: 'https://www.codingninjas.com/codestudio/problems/8230839', videoUrl: 'https://youtu.be/kR8N07B9k8I' },
    ],
  },
];

export const difficultyColors = {
  Easy: '#4CAF50',
  Medium: '#FF9800',
  Hard: '#F44336',
};

export function getDifficultyCount(category: Category) {
  const counts = { Easy: 0, Medium: 0, Hard: 0 };
  category.problems.forEach(p => counts[p.difficulty]++);
  return counts;
}

export function getTotalStats() {
  let easy = 0, medium = 0, hard = 0;
  categories.forEach(cat => {
    const counts = getDifficultyCount(cat);
    easy += counts.Easy;
    medium += counts.Medium;
    hard += counts.Hard;
  });
  return { easy, medium, hard, total: easy + medium + hard };
}
