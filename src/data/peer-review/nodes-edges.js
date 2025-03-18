import { MarkerType } from 'npm:@xyflow/react';

export const COLORS = {
  green:  "#009E0F",
  red:    "#ED4448",
  yellow: "#FFC300",
  blue:   "#00A2FF",
  purple: "#DF9CCC",
  light_gray: "#F2F2F2",
  pale_lilac: "#C1CADF",
};

const peopleGroups = {
  'author-group': {
    data: { label: 'Author' },
    position: { x: 0, y: 0 },
    type: 'group',
    style: {
      width: 1200,
      height: 150,
    },
  },
  'reviewer-group': {
    data: { label: 'Reviewers' },
    position: { x: 0 , y: 375 },
    type: 'group',
    style: {
      width: 1200,
      height: 110,
    },
  },
  'editor-group': {
    data: { label: 'Editors' },
    position: { x: 0, y: 150 },
    type: 'group',
    style: {
      width: 1200,
      height: 225,
    },
  },
};

const MARGIN = 15;

const stageGroups = {
  'desk-review-group': {
    data: { label: 'Desk Review' },
    position: { x: MARGIN, y: MARGIN },
    type: 'group',
    style: {
      width: 375,
      height: peopleGroups['author-group'].style.height + peopleGroups['editor-group'].style.height / 2 - 2 * MARGIN,
    },
  },
  'peer-review-group': {
    data: { label: 'Peer Review' },
    position: { x: 225, y: peopleGroups['author-group'].style.height + peopleGroups['editor-group'].style.height / 2 },
    type: 'group',
    style: {
      width: 960,
      height: peopleGroups['editor-group'].style.height / 2 + peopleGroups['reviewer-group'].style.height - MARGIN,
    },
  },
};

const groupNodes = {
  ...peopleGroups,
  ...stageGroups,
  'decision-group': {
    data: { label: 'Decision' },
    position: { x: peopleGroups['author-group'].style.width, y: 0 },
    type: 'group',
    style: {
      width: 175,
      height: Object.keys(peopleGroups).reduce((acc, key) => acc + peopleGroups[key].style.height, 0),
    },
  }
}

const authorNodes = [
  {
    id: 'submission',
    data: { label: 'Author submits article' },
    position: { x: 25 },
    targetPosition: 'top',
    sourcePosition: 'bottom',
  },
  {
    id: 'pre-review-revision-choice',
    data: { label: 'Author decides whether to revise and resubmit article (pre-review)' },
    position: { x: 225, y: 45 },
    targetPosition: 'bottom',
    sourcePosition: 'top',
  },
  {
    id: 'r&r-choice',
    data: { label: 'Author decides whether to revise and resubmit article (post-review)' },
    position: { x: 600, y: 45 },
    targetPosition: 'bottom',
    sourcePosition: 'right',
    style: {
      width: 225,
    }
  },
  {
    id: 'r&r-revision',
    data: { label: 'Author revises and resubmits article' },
    position: { x: 900, y: 85 },
    targetPosition: 'left',
  },
].map(node => {
  node.position.y ??= 30;
  return { ...node, parentId: 'author-group' }
});

const deskReviewNodes = [
  {
    id: 'desk-review',
    data: { label: 'Editors review submission' },
    position: { x: 50 },
    targetPosition: 'top',
  },
].map(node => {
  node.position.y = + MARGIN;
  return ({ 
    ...node, 
    parentId: 'editor-group',
    sourcePosition: node.sourcePosition || 'right',
    targetPosition: node.targetPosition || 'left',
  })
});
  
const peerReviewNodes = [
  {
    id: 'secure-reviewers',
    data: { label: 'Editors secure two reviewers' },
    position: {  },
    sourcePosition: 'bottom',
    targetPosition: 'left',
  },
  {
    id: 'peer-review',
    data: { label: 'Reviewers read article and share a Reader\'s report and recommendation with the editors' },
    position: { x: 75, y: 10 + groupNodes['reviewer-group'].position.y - groupNodes['peer-review-group'].position.y },
    style: {
      width: 250,
    },
    sourcePosition: 'top',
  },
  {
    id: 'compile-reviews',
    data: { label: 'Editors compile reviews and return a decision' },
    position: { x: 275 },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: 'review-revisions',
    data: { label: 'Editors review revision with advice from original or new reviewer(s) and return a decision' },
    position: { x: 775 },
    style: {
      width: 125,
      height: 160
    },
    sourcePosition: 'right',
  },
].map(node => {
  node.position.x ??= 25;
  node.position.x += groupNodes['peer-review-group'].position.x;
  node.position.y ??= 25;
  node.position.y += groupNodes['editor-group'].style.height / 2;

  return ({ 
    ...node, 
    parentId: 'editor-group',
    sourcePosition: node.sourcePosition || 'right',
    targetPosition: node.targetPosition || 'left',  
  })
});

const decisionNodes = [
  {
    id: 'withdraw',
    data: { label: 'Article Withdrawn' },
    position: { y: 15 },
  },
  {
    id: 'reject',
    data: { label: 'Article Declined' },
    position: { y: 200 },
  },
  {
    id: 'accept',
    data: { label: 'Article Accepted (possibly with minor or major revisions)' },
    position: { y: 400 },
    targetPosition: 'bottom',
  },
].map(node => {
  node.position.x = 15;
  return ({ 
    ...node, 
    parentId: 'decision-group',
    sourcePosition: node.sourcePosition || 'right',
    targetPosition: node.targetPosition || 'left',
    type: 'output',
  });
});

export const initialNodes = [
  ...Object.keys(groupNodes).map(key => {
    return {
      id: key,
      ...groupNodes[key],
    }
  }),
  ...authorNodes,
  ...deskReviewNodes,
  ...decisionNodes,
  ...peerReviewNodes,
];

// Edges

function marker(color=COLORS.blue) {
  return {
   markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 15,
      height: 15,
      color: color,
    },
    style: {
      strokeWidth: 1.75,
      stroke: color,
    },
  };
}

const deskReviewEdges = [
  {
    id: 'submit-to-desk-review',
    source: 'submission',
    target: 'desk-review',
    type: 'default',
  },
  {
    id: 'desk-reject', 
    source: 'desk-review', 
    target: 'reject', 
    label: 'Declined (desk rejection)', 
    ...(marker(COLORS.red)),
  },
  {
    id: 'advance-to-peer-review',
    source: 'desk-review',
    target: 'secure-reviewers',
    label: 'Article advances',
    type: 'default',
  },
  {
    id:  'pre-review-revision-request',
    source: 'desk-review',
    target: 'pre-review-revision-choice',
    label: 'Article needs revision',
    ...marker(COLORS.yellow),
    type: 'default',
  },
  {
    id: 'declines-pre-review-revision-request',
    source: 'pre-review-revision-choice',
    target: 'withdraw',
    label: 'Author declines to revise',
    ...marker(COLORS.purple),
  },
  {
    id: 'agree-to-pre-review-revision-request',
    source: 'pre-review-revision-choice',
    target: 'submission',
    label: 'Author revises',
  },
];

const peerReviewEdges = [
  // Review
  {
    id: 'articles-to-reviewers',
    source: 'secure-reviewers',
    target: 'peer-review',
  },
  {
    id: 'review-to-editors',
    source: 'peer-review',
    target: 'compile-reviews',
    type: 'default',
  },
  // Decisions
  {
    id: 'revise-and-resubmit',
    source: 'compile-reviews',
    target: 'r&r-choice',
    label: 'Revise and Resubmit',
    ...marker(COLORS.yellow),
    type: 'default',
  },
  {
    id: 'accepted-with-revisions',
    source: 'compile-reviews',
    target: 'accept',
    label: 'Accepted',
    ...marker(COLORS.green),
  },
  {
    id: 'rejected-after-peer-review',
    source: 'compile-reviews',
    target: 'reject',
    label: 'Declined',
    ...marker(COLORS.red),
  },
  // R&R
  {
    id: 'withdraw-after-peer-review',
    source: 'r&r-choice',
    target: 'withdraw',
    label: 'Author Declines to Revise',
    ...marker(COLORS.purple),
  },
  {
    id: 'r&r-after-peer-review',
    source: 'r&r-choice',
    target: 'r&r-revision'
  },
  {
    id: 'resubmission',
    source: 'r&r-revision',
    target: 'review-revisions',
  },
  {
    id: 'resubmission-accept',
    source: 'review-revisions',
    target: 'accept',
    label: 'Accepted',
    ...marker(COLORS.green),
  },
  {
    id: 'resubmission-reject',
    source: 'review-revisions',
    target: 'reject',
    label: 'Declined',
    ...marker(COLORS.red),
  },
];

export const initialEdges = [
  ...deskReviewEdges, 
  ...peerReviewEdges,
].map(
  edge => ({
    ...edge, 
    ...(edge.markerEnd? {} : marker()),
    type: edge.type || 'smoothstep',
}));
