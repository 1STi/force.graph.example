import React, { useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { nanoid } from 'nanoid';

const hokageId = nanoid(5);

const hokage = {
  level: 'hokage',
  id: hokageId,
  name: 'minato',
  force: 150,
  centralNode: true,
};

const nodes = [{
  ...hokage
}];
const links = [];

const guenins = [
  {
    name: 'naruto',
    force: 30,
    team: 7
  },
  {
    name: 'sasuke',
    force: 30,
    team: 7
  },
  {
    name: 'sakura',
    force: 25,
    team: 7
  },
  {
    name: 'hinata',
    force: 20,
    team: 8
  },
  {
    name: 'kiba',
    force: 18,
    team: 8
  },
  {
    name: 'shino',
    force: 16,
    team: 8
  },
  {
    name: 'shikamaru',
    force: 20,
    team: 10
  },
  {
    name: 'ino',
    force: 14,
    team: 10
  },
  {
    name: 'chouji',
    force: 16,
    team: 10
  },
];


const jounins = [
  {
    level: 'jounin',
    name: 'kakashi',
    force: 50,
    team: 7
  },
  {
    level: 'jounin',
    name: 'asuma',
    force: 40,
    team: 10
  },
  {
    level: 'jounin',
    name: 'kurenai',
    force: 35,
    team: 8
  }
];

jounins.forEach((jounin) => {
  const jouninId = nanoid(5);

  const team = guenins.filter(guenin => guenin.team === jounin.team);

  nodes.push({
    id: jouninId,
    nodeColor: '#000',
    name: jounin.name,
    force: jounin.force,
    level: jounin.level,
    centralNode: true,
  });

  links.push({
    id: nanoid(5),
    source: jouninId,
    target: hokageId
  });

  team.forEach((guenin) => {
    const gueninId = nanoid(5);

    nodes.push({
      id: gueninId,
      nodeColor: '#000',
      name: guenin.name,
      force: guenin.force,
    });

    links.push({
      id: nanoid(5),
      source: gueninId,
      target: jouninId
    });
  });
});

const data = {
  nodes: nodes,
  links: links
};


const App = () => {
  const graphRef = useRef(null);

  return (
    <div className="App">
      <ForceGraph2D
        ref={graphRef}
        width={window.innerWidth}
        height={window.innerHeight}
        graphData={data}
        dagMode="null"
        dagLevelDistance={300}
        minZoom={1}
        maxZoom={5}
        nodeVal={(node) => node.force}
        nodeColor={(node) => {
          if (node.level === 'hokage') return '#505050';
          if (node.level === 'jounin') return '#507cff';
          return '#93c9ee';
        }}
        nodeRelSize={1.75}
        linkColor={() => '#93c9ee'}
        linkWidth={2}
      />
    </div>
  );
}

export default App;
