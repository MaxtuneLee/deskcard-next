"use client";
import { DepartmentData, User, UserToken } from "@/api/type";
import { getAccessToken } from "@/api/user";
import CanvasBox from "@/components/canvasBox";
import axios from "axios";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import vConsole from "vconsole";

export default function Home() {
	const [userData, setUserData] = useState<User | null>(null);
	const [departmentInfo, setDepartmentInfo] = useState<
		DepartmentData[] | null
	>(null);
	const canvasBoxRef = useRef<{ getImage: () => string }>(null);
	useEffect(() => {
		if ((window as any).h5sdk) {
			const url = window.location.href;
			axios.get(`/api/auth?url=${url}`).then((res) => {
				console.log(res);
				const { appid, timestamp, nonceStr, signature } = res.data;
				(window as any).h5sdk.config({
					appId: appid,
					timestamp,
					nonceStr,
					signature,
					onSuccess: (res: any) => {
						console.log(`config success: ${JSON.stringify(res)}`);
					},
					//鉴权失败回调
					onFail: (err: any) => {
						throw `config failed: ${JSON.stringify(err)}`;
					},
				});
			});
			(window as any).h5sdk.ready(() => {
				console.log("h5sdk is ready");
				(window as any).tt.requestAccess({
					appID: "cli_a6f925ecf836100c",
					scopeList: [],
					success: (res: any) => {
						const { code } = res;
						axios.post("/api/user-info", { code }).then((res) => {
							console.log(res.data);
							setUserData(res.data.user);
							setDepartmentInfo(res.data.department);
						});
					},
					fail: (error: any) => {
						console.error(`requestAccess failed: `, error);
					},
				});
			});
		}
	}, []);
	return (
		<>
			<main className="grid grid-cols-2 overflow-hidden">
				<div className="p-4 *:my-4">
					<h1 className="text-[50px] font-bold">桌面工牌生成</h1>
					<p>生成数据来自飞书，修改飞书的资料刷新后生效</p>
					<p>
						更多自定义选项开发中，如果你有什么好的设计想法，欢迎联系
						Web 组同学
					</p>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							// this is a data:image/png;base64 string
							const img = canvasBoxRef.current?.getImage();
							const a = document.createElement("a");
							a.href = img as string;
							a.download = "桌牌.png";
							a.click();
						}}
					>
						下载
					</button>
				</div>
				<div className="flex flex-col justify-center items-center py-4 overflow-y-scroll">
					<div className="py-5 font-bold text-lg">打印预览 (A4) </div>
					<CanvasBox
						ref={canvasBoxRef}
						data={userData}
						department={departmentInfo}
					/>
				</div>
				{/* <Script
					src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
					onLoad={() => {
            // @ts-ignore
						new VConsole();
					}}
				></Script> */}
			</main>
			<Script
				src="https://lf1-cdn-tos.bytegoofy.com/goofy/lark/op/h5-js-sdk-1.5.29.js"
				strategy="beforeInteractive"
			></Script>
		</>
	);
}
