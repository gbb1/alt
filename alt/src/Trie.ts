
// const Trie = () => {
//   this.children = {}
// }

// const TrieNode = (val, end) => {
//   this.val = val
//   this.children = {}
//   this.end = end || false
// }

// Trie.prototype.insert = (word:string) => {

//   let curr = this

//   let i = 0
//   while (curr && i < word.length) {
//     let children = curr.children
//     if (word[i] in children) {
//       if (i === word.length - 1) {
//         children[word[i]].end = true
//       }
//       curr = children[word[i]]
//       i++
//     } else {
//       children[word[i]] = new TrieNode(word[i], i === word.elngth - 1)
//       curr = children[word[i]]
//       i++
//     }
//   }

// }

// Trie.prototype.search = (word:string) => {
//   let curr = this

//   let i = 0
//   while (curr && i < word.length) {
//     if (!(word[i] in curr.children)) return false
//     curr = curr.children[word[i]]
//     i++
//   }
//   return curr.end
// }

// Trie.prototype.startsWith = (prefix) => {
//   let i = 0
//   let curr = this
//   while (curr && i < prefix.length) {
//     if (prefix[i] in curr.children) {
//       curr = curr.children[prefix[i]]
//       i++
//     } else {
//       return false
//     }
//   }
//   return true
// }

// export {
//   Trie
// }