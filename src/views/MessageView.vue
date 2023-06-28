<template>
    <div>
        <HeaderBox></HeaderBox>
        <el-divider></el-divider>
        <el-col :span="2" style="min-height:20px"></el-col>
        <el-col :span="4" style=""><UserAsideBox></UserAsideBox></el-col>
        <el-col :span="16" style="min-height:20px">
            <el-empty></el-empty>
        </el-col>
        <el-col :span="2" style="min-height:20px"></el-col>
    </div>
</template>