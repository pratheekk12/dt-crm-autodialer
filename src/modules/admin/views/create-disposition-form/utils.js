export const createNodeForSortableTree = (questions) => {
  for(let node of questions){
    node.title = node.question;
    node.expanded = true
    let child = []
    for(let opt of node.option){
      if(opt.dependentQuestion){
        opt.children = createNodeForSortableTree(opt.dependentQuestion)
        opt.expanded = true
      }
      child.push({...opt, title : opt.label })
    }
    node.children = child;
  }
  return questions
}
