"use client";
import { DepartmentData, User, UserToken } from "@/api/type";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Stage, Layer, Group, Text, Rect, Image, Circle } from "react-konva";
import Konva from "konva";
import useImage from "use-image";
export default forwardRef(function CanvasBox(
	{
		data,
		department,
	}: {
		data: User | null;
		department: DepartmentData[] | null;
	},
	ref
) {
	const [sastLogo] = useImage(
		"/logo.png",
		"anonymous"
	);
	const [avatar] = useImage(data?.avatar?.avatar_240 || "", "anonymous");
	const avatarRef = useRef<Konva.Group>(null);
	const stageRef = useRef<Konva.Stage>(null);
	if (avatarRef.current) {
		setTimeout(() => {
			avatarRef.current?.cache();
		}, 0);
	}
	useImperativeHandle(ref, () => ({
		getImage: () => {
			return stageRef.current?.toDataURL({
				pixelRatio: 2,
			});
		},
	}));
	return (
		<div>
			<Stage width={595} height={842} ref={stageRef}>
				<Layer x={0} y={0}>
					<Rect
						width={595}
						height={842}
						fill="white"
						strokeEnabled
						stroke={"#000"}
					></Rect>
					{data && (
						<Group x={0} y={511}>
							<Rect
								width={595}
								height={267}
								fill="white"
								strokeEnabled
								stroke={"#000"}
								dashEnabled
								dash={[10, 10]}
							></Rect>
							<Text
								x={39}
								y={38}
								text={data.work_station.split("-").join(" - ")}
								fontSize={48}
								fontStyle="700"
							></Text>
							<Text
								x={41}
								y={149}
								text={
									department
										? department
												.map((value) => value.name)
												.join(" > ")
										: ""
								}
								fontSize={20}
							></Text>
							<Text
								x={39}
								y={176}
								text={data.nickname ? data.nickname : data.name}
								fontSize={48}
								fontStyle="italic 700"
							></Text>
							{data.nickname && (
								<Text
									x={240}
									y={197}
									text={`${data.name}`}
									fontSize={20}
									fontStyle="italic 700"
								></Text>
							)}
							<Image
								image={sastLogo}
								x={495}
								y={38}
								width={58}
								height={37}
							/>
							<Group ref={avatarRef}>
								<Image
									image={avatar}
									x={454}
									y={125}
									width={100}
									height={100}
								/>
								<Circle
									x={454}
									y={125}
									radius={50}
									fill="white"
									offset={{ x: -50, y: -50 }}
									globalCompositeOperation="destination-in"
								/>
							</Group>
						</Group>
					)}
				</Layer>
			</Stage>
		</div>
	);
});
