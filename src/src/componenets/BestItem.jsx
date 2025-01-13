import React from 'react';
import {Link} from 'react-router-dom';
import './BestItem.scss';

const BestItem = () => {
	return (
		<div className='bestItem'>
		<h2>Best Item</h2>
		<p>Anniversary Sale early</p>
		<div className="best">
			<ul className="flexbox">
				<li>
					<Link to="">
						<span className="bestsp">
							<div className="bestTextBox">
								<b>루나 베이직 물병식기</b>
								<p>보급형 물병은 퍼피의 체형에 맞게 높이 조절가능 <br /> 모든 구성품 분리가 가능해 세척 용이</p>
								<span>More Btn</span>
							</div>
						</span>
					</Link>
				</li>
				<li>
					<div className="bestbox">
						<ul>
							<li>
								<Link>
									<div className="aWrap">
										<b>반자동급식</b>
										<p>먹은 만큼 사료가 나와 외출 시에도 끼니 걱정 No! <br /> 반려동물이 자율적으로 먹을 수 있어요~~</p>
									</div>	
								</Link>
							</li>
							<li>
								<Link>
									<div className="aWrap">
										<span><i><button>More View</button></i></span>
									</div>	
								</Link>
							</li>
							<li>
								<Link>
									<div className="aWrap">
										<span><i><button>More View</button></i></span>
									</div>	
								</Link>
							</li>

							<li>
								<Link>
									<div className="aWrap">
										<b>반려동물 접이식 밥그릇 2p세트</b>
										<p>늘렸다 줄였다 높이 조절로 평안하게 ~ <br /> 반려동물 휴대용 접이식 밥그릇</p>
									</div>
								</Link>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
		</div>
	);
};

export default BestItem;