import React, { useRef, useState } from 'react';
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

const layouts = [
  {
    id: 1,
    label: 'Top/Down',
    key: 'td'
  },
  {
    id: 2,
    label: 'Bottom/Up',
    key: 'bu'
  },
  {
    id: 3,
    label: 'Left/Right',
    key: 'lr'
  },
  {
    id: 4,
    label: 'Right/Left',
    key: 'rl'
  },
  {
    id: 5,
    label: 'Near to Far',
    key: 'zout'
  },
  {
    id: 6,
    label: 'Far to Near',
    key: 'zin'
  },
  {
    id: 7,
    label: 'Radial In',
    key: 'radialin'
  },
  {
    id: 8,
    label: 'Radial Out',
    key: 'radialout'
  },
]

const Menu = (props) => (
  <div
    style={{
      position: 'fixed',
      top: 10,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      zIndex: 3,
    }}
  >
    <select
      onChange={(ev ) => {
        props.setLayout(ev.target.value);
      }}
      name="layout"
    >
      {layouts.map((layout) => (
        <option
          key={layout.id}
          value={layout.key}
        >
          {layout.label}
        </option>
      ))}
    </select>
  </div>
)


const App = () => {
  const graphRef = useRef(null);
  const [layout, setLayout] = useState('');

  return (
    <div className="App">
      <Menu setLayout={setLayout} />
      <ForceGraph2D
        ref={graphRef}
        width={window.innerWidth}
        height={window.innerHeight}
        graphData={data}
        dagMode={layout}
        dagLevelDistance={100}
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
