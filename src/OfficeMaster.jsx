import './office-master.css';

const asset = (name) => `${import.meta.env.BASE_URL}assets/office-layers/${name}.png`;
// Figma 6328:398 master: 5732 × 3731. Layer entries retain their real floor,
// wall, glass, door, and furniture assets in Figma paint order.
const rooms = [
  ['virtuve','Virtuvė',[1771.38,18,1822.36,1358],[['floor','c6421',[4,387,1819,971]],['wall','2ef54',[0,0,843,873]]]],
  ['konferenciju','Konferencijų kambarys',[2799,584,1240,1109],[['floor','ae9cd',[0,381,1240,728]],['glass','c9ad5',[3,-1,774,830]]]],
  ['ernestas','Ernesto kabinetas',[4299,1458,1433,1213],[['furniture','9add0',[47,400,1386,813]],['wall','36581',[47,15,782,839]],['glass','e5822',[60,469,607,734]]]],
  ['archyvas','Archyvas',[1359,499,1235,1086],[['floor','2d282',[0,381,1197,705]],['wall','e42d9',[2,-1,1233,1070]],['wall','ff6a9',[2,0,1233,1070]],['door','aa486',[2,4,1233,1070]],['wall','a6fd8',[-1,8,1233,1070]]]],
  ['secret','Secret spot',[731,728,1456,1211],[['floor','c17e7',[11,393,1396,818]],['wall','f5703',[13,10,1445,1191]],['wall','69a99',[2,13,1445,1191]],['door','434ed',[3,15,1445,1191]],['wall','92560',[13,10,1445,1191]]]],
  ['posedziu','Posėdžių salė',[2342,1012,1367,1167],[['floor','2caee',[0,387,1367,780]],['wall','04f23',[10,1,1328,1155]],['glass','807ee',[5,0,1328,1155]]]],
  ['serveris','AI serveris',[3279,1604,951,904],[['floor','de1d8',[0,389,951,515]],['wall','3d944',[76,2,873,895]],['glass','f4cca',[78,0,873,895]]]],
  ['it','IT',[2,1090,1784,1387],[['floor','455e1',[0,388,1709,999]],['floor','it-floor-detail',[0,388,1709,999]],['wall','ad1e9',[0,4,1779,1380]],['wall','d902a',[0,4,1779,1380]],['glass','e3dfb',[0,9,1779,1380]],['trim','a1a62',[1,259,742,580],{cropWidth:'129.71%'}],['trim','a1a62',[743,301,815,580],{cropWidth:'118.09%',mirrored:true}],['furniture','it-desk-computer',[842,351,442,442]]]],
  ['egidijus','Egidijaus kabinetas',[924,1432,1734,1374],[['furniture','b1a6a',[43,385,1688,989]],['wall','d9f66',[-75,-202,1779,1380]],['glass','d1e6e',[601,2,1132,1362]],['wall','9f66a',[602,0,1132,1362]]]],
  ['seo','SEO',[1536,1770,2187,1655],[['furniture','78a2f',[0,380,2187,1275]],['glass','fe7e2',[1118,0,1062,1001]]]],
  ['adomas','Adomo kabinetas',[2529,2374,1749,1357],[['wall','9845c',[63,0,1137,1052]],['furniture','3b9f6',[0,355,1722,1002]],['glass','b727e',[1111,6,633,790]]]],
  ['ads','ADS kabinetas',[3256,851,1865,1468],[['floor','2f30d',[23,392,1842,1076]],['furniture','dfe81',[23,392,1842,1076]],['wall','4c704',[0,0,796,845]]]],
  ['reception','Registratūra',[3426,2229,1536,853],[['furniture','d54ba',[0,0,1536,853]]]],
];

const percentFrame = ([left, top, width, height], baseWidth, baseHeight) => ({ left: `${left / baseWidth * 100}%`, top: `${top / baseHeight * 100}%`, width: `${width / baseWidth * 100}%`, height: `${height / baseHeight * 100}%` });
function ItTrim({ image, frame, roomSize, cropWidth, mirrored }) { return <div className="office-layer office-layer--trim" data-layer="trim" style={{ ...percentFrame(frame, roomSize[0], roomSize[1]), transform:mirrored ? 'scaleX(-1)' : undefined }}><img src={asset(image)} alt="" draggable="false" style={{ width:cropWidth, height:'100.03%' }} /></div>; }
function ItDesk({ image, frame, roomSize }) { return <img className="office-layer office-layer--furniture" data-layer="furniture" data-node-id="6349:1275" data-testid="it-desk-computer" src={asset(image)} alt="" draggable="false" style={{ ...percentFrame(frame, roomSize[0], roomSize[1]), transform:'scaleX(-1)' }} />; }
function Layer({ type, image, frame, roomSize, options }) {
  if (type === 'trim') return <ItTrim image={image} frame={frame} roomSize={roomSize} {...options} />;
  if (image === 'it-desk-computer') return <ItDesk image={image} frame={frame} roomSize={roomSize} />;
  if (image === 'b727e') return <div className="office-layer office-layer--glass office-layer--cropped" data-layer={type} style={percentFrame(frame, roomSize[0], roomSize[1])}>
    <img src={asset(image)} alt="" draggable="false" style={{ left:'-166.67%', top:0, width:'261.61%', height:'131.77%' }} />
  </div>;
  return <img className={`office-layer office-layer--${type}`} data-layer={type} src={asset(image)} alt="" draggable="false" style={percentFrame(frame, roomSize[0], roomSize[1])} />;
}
function Room({ room, selectedId, onSelect }) { const [id,name,box,layers] = room; return <button type="button" className={`office-room ${selectedId === id ? 'is-selected' : ''}`} data-testid={`office-room-${id}`} data-room={id} aria-label={`${name}. Iškelti kabinetą`} onClick={() => onSelect(id)} style={percentFrame(box, 5732, 3731)}>{layers.map(([type,image,frame,options], i) => <Layer key={`${image}-${i}`} type={type} image={image} frame={frame} roomSize={[box[2],box[3]]} options={options} />)}<span className="office-room__hit" aria-hidden="true" /></button>; }
function StaticLayer({ name, frame, className = '' }) { return <img className={`office-static ${className}`} src={asset(name)} alt="" draggable="false" style={percentFrame(frame, 5732, 3731)} />; }
// Separate React component boundaries mirror the named Figma room components.
const VirtuveRoom = (props) => <Room room={rooms[0]} {...props} />;
const KonferencijuRoom = (props) => <Room room={rooms[1]} {...props} />;
const ErnestasRoom = (props) => <Room room={rooms[2]} {...props} />;
const ArchyvasRoom = (props) => <Room room={rooms[3]} {...props} />;
const SecretRoom = (props) => <Room room={rooms[4]} {...props} />;
const PosedziuRoom = (props) => <Room room={rooms[5]} {...props} />;
const AiServerRoom = (props) => <Room room={rooms[6]} {...props} />;
const ItRoom = (props) => <Room room={rooms[7]} {...props} />;
const EgidijusRoom = (props) => <Room room={rooms[8]} {...props} />;
const SeoRoom = (props) => <Room room={rooms[9]} {...props} />;
const AdomasRoom = (props) => <Room room={rooms[10]} {...props} />;
const AdsRoom = (props) => <Room room={rooms[11]} {...props} />;
const ReceptionRoom = (props) => <Room room={rooms[12]} {...props} />;

function Corridor() { return <div className="office-corridor" data-testid="office-corridor" style={percentFrame([1521,1177,2309,1431],5732,3731)}>
  <img src={asset('7d6e1')} alt="" draggable="false" />
  <img src={asset('23aa7')} alt="" draggable="false" />
</div>; }

function Front() { return <div className="office-front office-perimeter-glass" style={percentFrame([3121,1818,2609,1913],5732,3731)}>
  <div className="office-front__glass" style={percentFrame([1216,0,1393,1913],2609,1913)}>
    <img src={asset('a413a')} alt="" draggable="false" style={percentFrame([-1216,0,2609,1913],1393,1913)} />
  </div>
  <img className="office-front__child" src={asset('2283d')} alt="" draggable="false" style={percentFrame([1576,444,277,557],2609,1913)} />
  <img className="office-front__child" src={asset('81ef2')} alt="" draggable="false" style={percentFrame([0,586,1659,1327],2609,1913)} />
</div>; }

export function OfficeMaster({ selectedId, onSelect, itProgress = 0 }) { return <div className={`office-master ${itProgress > 0 ? 'office-master--it-story' : ''}`} style={{ '--it-progress': itProgress }} data-testid="office-master" aria-label="Enternet biuro master komponentas">
  {/* Master paint order is preserved below exactly as in Figma. */}
  <StaticLayer name="3e985" frame={[3280,2003,951,515]} /><StaticLayer name="3f761" frame={[2600,0,3130,2207]} />
  <VirtuveRoom selectedId={selectedId} onSelect={onSelect} /><StaticLayer name="e891f" frame={[2543,739,363,595]} /><KonferencijuRoom selectedId={selectedId} onSelect={onSelect} />
  <AdsRoom selectedId={selectedId} onSelect={onSelect} /><StaticLayer name="528ba" frame={[3820,1460,1312,1198]} />
  <ErnestasRoom selectedId={selectedId} onSelect={onSelect} /><ArchyvasRoom selectedId={selectedId} onSelect={onSelect} /><SecretRoom selectedId={selectedId} onSelect={onSelect} /><Corridor /><PosedziuRoom selectedId={selectedId} onSelect={onSelect} />
  <StaticLayer name="b445b" frame={[2342,1420,1367,780]} /><AiServerRoom selectedId={selectedId} onSelect={onSelect} /><ReceptionRoom selectedId={selectedId} onSelect={onSelect} /><ItRoom selectedId={selectedId} onSelect={onSelect} /><EgidijusRoom selectedId={selectedId} onSelect={onSelect} /><SeoRoom selectedId={selectedId} onSelect={onSelect} /><AdomasRoom selectedId={selectedId} onSelect={onSelect} />
  <StaticLayer name="95a9c" frame={[0,1515,3136,2210]} className="office-perimeter-glass" /><Front /><StaticLayer name="fbd97" frame={[4699,2257,279,538]} className="office-perimeter-glass" />
</div>; }
