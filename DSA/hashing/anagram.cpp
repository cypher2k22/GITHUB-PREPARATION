#include <iostream>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
public:
    /**
     * Checks whether two character vectors are anagrams of each other.
     * Uses a hash map frequency counter.
     * 
     * Time Complexity:  O(N) where N is the size of the vectors.
     * Space Complexity: O(K) where K is the number of unique characters (at most O(N)).
     */
    bool isAnagram(const vector<char>& w, const vector<char>& t) {
        // Step 1: Anagrams must have the identical character count
        if (w.size() != t.size()) {
            return false;
        }

        unordered_map<char, int> charCounts;

        // Step 2: Increment character counts for the first vector
        for (char ch : w) {
            charCounts[ch]++;
        }

        // Step 3: Decrement character counts for the second vector
        for (char ch : t) {
            charCounts[ch]--;
        }

        // Step 4: Verify all net frequencies returned to zero
        for (const auto& pair : charCounts) {
            if (pair.second != 0) {
                return false;
            }
        }

        return true;
    }
};