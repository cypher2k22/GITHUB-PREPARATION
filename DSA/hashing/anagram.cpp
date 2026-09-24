#include<iostream>
#include<unordered_map>
#include<vector>
using namespace std;


class anagarrigam{
    public:
        bool anagram(vector<char> w,vector<char> t){
            unordered_map<char,int> memory;
             if(w.size()!=t.size()){
                return false;
             }
             for (int i=0;i<w.size();i++){
                
                    memory[w[i]]++;
                }
                

             
               for (int i=0;i<t.size();i++){
                
                    memory[t[i]]--;
                }
               

             
            for(auto x : memory){
                if(x.second != 0){
                    return false;
                }
            }
             return true;

        }
};